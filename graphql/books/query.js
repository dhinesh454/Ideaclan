const {GraphQLInt,GraphQLList,GraphQLString,GraphQLNonNull} = require("graphql");
const BookType = require("./typeDef");
const Book = require('../../models/book');
const { Op } = require("sequelize");
const sequelize=require('../../utilis/database');

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


module.exports={ getBooks, getAllBooks,searchBook}