const {GraphQLInt,GraphQLList} = require("graphql");
const UserType = require("./typeDef");
const User = require('../../models/user');



const getUser ={
    type:UserType,
    args:{
        id:{type:GraphQLInt},
    },
    resolve:async (parent,args,context,info) => {
        try {
            const user = await User.findByPk(args.id ,{
                include:["actions"]
            });
            if(!user) {
                throw new Error('UserId Not Exists..Please Check Again')
            } 
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
}


const getAllUsers = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args, context, info) => {
     try { 
           const users= await User.findAll();
           return users;
     } catch (error) {
           throw new Error(error)
     }
    }
}
module.exports={getUser,getAllUsers}