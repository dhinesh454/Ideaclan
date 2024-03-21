const { GraphQLString, GraphQLNonNull,GraphQLInt,GraphQLList} = require("graphql")
const BookType = require("./typeDef");
const Book = require("../../models/book");
const User = require('../../models/user');
const Action = require('../../models/action');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const sequelize=require('../../utilis/database');

const createBook = {
    type: BookType,
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args, context, info) => {
        try{
            const token = context.token;
            console.log('------------------->',context.token)
            if (!token) {
                return ({message:"Authorization token is required"})
            }
    
            const decoded = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY);
            const userId = decoded.userId;
    
        
    
            // Check user role
            const user = await User.findByPk(userId);
            if (!user || user.role !== 'admin') {
                return ({message:"Unauthorized. Admin role required."})
            }
    
            const book = await Book.create(args);
            return book;
        
        }catch (error) {
            throw new Error(error)
        }
    }
};



const borrowBook = {
    type:BookType,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info)=>{
        try {
            const token = context.token;
            if (!token) {
                return ({message:"Authorization token is required"})
                
            }
    
            const decoded = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY);
            const userId = decoded.userId;


            const book = await Book.findByPk(args.id);
            if(!book.isavailable){
                return ({message:"Book already Sold!!.."}) 
            }
            
            const bookAction = await Action.findOne({where:{bookId:args.id}});

           

            if(bookAction){
                if(bookAction.borrowrequest){
                    return ({message:`There's already a pending borrowing request for this book.`})
                }

                if(bookAction.userId==userId){
                    return ({message:`Alrerady Borrowed the Book ${book.title}`})
                }
            
              
                await Action.update({borrowrequest:true,requestId:userId},{where:{bookId:args.id}})
                return { message: `Borrow request for the book ${book.title} has been sent successfully.` };
            }

            await Action.create({title:book.title,action:"borrow",bookId:args.id,userId});

            return ({message:`successfully Borrowed the Book ${book.title}`})

        } catch (error) {
            throw new Error(error)
        }
    }
}


const buyBooks = {
    type:BookType,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info) =>{
        const t = await sequelize.transaction();
      try {
        const token = context.token;
        if (!token) {
            return ({message:"Authorization token is required"})
        }

        const decoded = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY);
        const userId = decoded.userId;

          const book = await Book.findByPk(args.id);
          if(!book.isavailable){
            return ({message:`Already bought the Book ${book.title} Sold out!!..`})
          }
          
          const bookAction = await Action.findOne({where:{bookId:args.id},transaction:t});


          if (bookAction && bookAction.action === 'borrow'){

            if(bookAction.userId!==userId){
                return ({message:"Book already borrowed by another User!!.."})
            }
             
          }

          await Book.update({isavailable:false},{where:{id:args.id},transaction:t})
        
          await Action.create({title:book.title,action:"bought",bookId:args.id,userId:userId},{transaction:t});
          await t.commit();
          return ({message:`successfully bought the Book ${book.title}`})

      } catch (error) {
        await t.rollback()  ///abort the transcation 
        throw new Error(error);
      }
    }
    
}





const returnBook = {
    type:BookType,
    args:{
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve:async(parent, args, context, info)=>{
        const t = await sequelize.transaction();
        try {
            const token = context.token;
            if (!token) {
               return ({message:"Authorization token is required"})

            }
    
            const decoded = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY);
            const userId = decoded.userId;
            
            const book = await Book.findByPk(args.id);
            if(!book.isavailable){
                return ({message:`Book already Sold!! cant Return`})
            }

               // Check if there's any pending borrowing request
            const pendingRequest = await Action.findOne({where:{bookId:args.id}});

            if(pendingRequest==null){
               return ({message:'User Not borrow the book check again!!'})
            }
            

            if (pendingRequest.borrowrequest) {
                // Update book ownership
                await Action.update({ UserId: pendingRequest.requestId ,borrowrequest:false,requestId:null,userId:pendingRequest.borrowrequest}, { where: { id: pendingRequest.id }, transaction: t });
            
                await t.commit();
                return ({ message: `Ownership of the book ${book.title} transferred successfully to the borrower.` });
            }

              else{
                await Action.destroy({where:{bookId:args.id,userId},transaction:t});
                await t.commit();

                return ({message:`successfully returned the Book ${book.title}`})
              }       
            

        } catch (error) {
            await t.rollback();
            throw new Error(error)
        }
    }
}

const searchBook = {
    type:new GraphQLList(BookType),
    args: {
        keyword: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args, context, info) => {
        try {
          
            const searchCriteria = {
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', `%${args.keyword.toLowerCase()}%`),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 'LIKE', `%${args.keyword.toLowerCase()}%`),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('genre')), 'LIKE', `%${args.keyword.toLowerCase()}%`)
                ],
                isavailable: true
            };

            // Find books based on search criteria
            const books = await Book.findAll({ where:searchCriteria});
            return books ;
        } catch (error) {
            throw new Error(error);
        }
    }
};


module.exports = {
    createBook,borrowBook,buyBooks,returnBook,searchBook
};