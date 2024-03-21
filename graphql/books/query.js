const {GraphQLInt,GraphQLList} = require("graphql");
const BookType = require("./typeDef");
const Book = require('../../models/book');

const getAllBooks = {
    type: new GraphQLList(BookType),
    resolve: async (parent, args, context, info) => {
     try { 
           const books= await Book.findAll();
           return books;
     } catch (error) {
           throw new Error(error)
     }
    }
}

const getBooks ={
    type:BookType,
    args:{
        id:{type:GraphQLInt},
    },
    resolve:async (parent,args,context,info) => {
        try {
            const books = await Book.findByPk(args.id);
            if(!books)return ({message:'Books not found!..please check again '})
            return books;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports={ getBooks, getAllBooks}