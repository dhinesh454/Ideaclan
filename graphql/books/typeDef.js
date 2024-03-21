const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean,GraphQLList} = require("graphql");
const ActionType = require('../action/typeDef')



const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        genre: { type: GraphQLString },
        isavailable: { type: GraphQLBoolean },
        message:{type:GraphQLString}
    })
});


module.exports=BookType;

