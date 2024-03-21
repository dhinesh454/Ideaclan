const {GraphQLInt} = require("graphql");
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
                return ({message:'User id not exist '})
            } 
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports={getUser}