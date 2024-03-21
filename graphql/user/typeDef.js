const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const ActionType = require('../action/typeDef')

const UserType = new GraphQLObjectType({
    name:"User",
    fields: ()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phonenumber:{type:GraphQLString},
        password:{type:GraphQLString},
        role:{type:GraphQLString},
        token:{type:GraphQLString},
        message:{type:GraphQLString},
        actions:{type:GraphQLList(ActionType)}


    })
});




module.exports=UserType;