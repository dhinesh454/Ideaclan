const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const BookType = require("../books/typeDef");

const ActionType = new GraphQLObjectType({
    name:"Action",
    fields: ()=>({
        id:{type:GraphQLInt},
        title:{type:GraphQLNonNull(GraphQLString)},
        bookId:{ type: GraphQLInt },
        userId:{ type: GraphQLInt },
        action:{type:GraphQLString},
        borrowrequest: {type:GraphQLString},
        requestId: {type:GraphQLInt}
    })
})

module.exports=ActionType;

 