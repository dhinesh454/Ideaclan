const { GraphQLString, GraphQLNonNull,GraphQLInt,GraphQLList} = require("graphql")
const BookType = require("./typeDef");
const Book = require("../../models/book");
const User = require('../../models/user');
const Action = require('../../models/action');
const jwt = require('jsonwebtoken');
const sequelize=require('../../utilis/database');
const authenticate=require('../../services/userservices');


const createBook = {
    type: BookType,
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args, context, info) => {
        try{
            
            authenticate.authorizeToken(context);
            const userId = context.userId;
        
            // Check user role
            const user = await User.findByPk(userId);
            if (!user || user.role !== 'admin') {
                throw new Error("Unauthorized. Admin role required.");
            }
    
            const book = await Book.create(args);
            return book;
        
        }catch (error) {
            throw new Error(error)
        }
    }
};



const borrowBook = {
    type: GraphQLString,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info)=>{
        try {
            authenticate.authorizeToken(context);
            const userId = context.userId;

            const book = await Book.findByPk(args.id);
            if(!book.isavailable){
                return "Book already Sold!!.."
            }
            
            const bookAction = await Action.findOne({where:{bookId:args.id}});
       

            if(bookAction){

                if(bookAction.userId==userId){
                    return `Already Borrowed the Book ${book.title}`
                }  

                if(bookAction.borrowrequest){
                    if(bookAction.requestId==userId){
                        return 'Borrow request already Send to the User.'
                    }
                    else {
                        return `There's already a pending borrowing request for this book.`
                    }
                   
                }

                
            
              
                await Action.update({borrowrequest:true,requestId:userId},{where:{bookId:args.id}})
                return `Borrow request for the book ${book.title} has been sent successfully.`
            }

            await Action.create({title:book.title,action:"borrow",bookId:args.id,userId});

            return `successfully Borrowed the Book ${book.title}`

        } catch (error) {
            throw new Error(error)
        }
    }
}


const buyBooks = {
    type: GraphQLString,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info) =>{
        const t = await sequelize.transaction();
      try {
        authenticate.authorizeToken(context);
        const userId = context.userId;

          const book = await Book.findByPk(args.id);
          if(!book.isavailable){
            return `Already bought the Book ${book.title} Sold out!!..`
          }
          
          const bookAction = await Action.findOne({where:{bookId:args.id},transaction:t});


          if (bookAction && bookAction.action === 'borrow'){

            if(bookAction.userId!==userId){
                return "Book already borrowed by another User!!.."
            }
             
          }

          await Book.update({isavailable:false},{where:{id:args.id},transaction:t})
          await Action.destroy({where:{bookId:args.id,userId},transaction:t});
          await Action.create({title:book.title,action:"bought",bookId:args.id,userId:userId},{transaction:t});
          await t.commit();
          return `successfully bought the Book ${book.title}`

      } catch (error) {
        await t.rollback()  ///abort the transcation 
        throw new Error(error);
      }
    }
    
}





const returnBook = {
    type: GraphQLString,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info)=>{
        const t = await sequelize.transaction();
        try {
            authenticate.authorizeToken(context);
            const userId = context.userId;
            
            const book = await Book.findByPk(args.id);
            if(!book.isavailable){
                return `Book already Sold!! cant Return`
            }

               // Check if there's any pending borrowing request
            const pendingRequest = await Action.findOne({where:{bookId:args.id}});

            if(!pendingRequest){
               return 'User cant return the book check again!!..Borrow the book then return'
            }

            
            if(pendingRequest.userId!==userId){
                return 'Cant Return User not borrow the book'
            }

            

            if (pendingRequest.borrowrequest) {

                

                // Update book ownership
                await Action.update({ userId: pendingRequest.requestId ,borrowrequest:false,requestId:null}, { where: { id: pendingRequest.id }, transaction: t });
            
                await t.commit();
                return `Ownership of the book ${book.title} transferred successfully to the borrower.` 
            }

              else{

               

                await Action.destroy({where:{bookId:args.id,userId},transaction:t});
                await t.commit();

                return `successfully returned the Book ${book.title}`
              }       
            

        } catch (error) {
            await t.rollback();
            throw new Error(error)
        }
    }
}



module.exports = {
    createBook,borrowBook,buyBooks,returnBook
};