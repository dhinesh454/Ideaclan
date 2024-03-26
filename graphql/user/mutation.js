const {GraphQLString, GraphQLNonNull} = require("graphql");
const UserType = require("./typeDef");
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const userServices = require('../../services/userservices')




const createUser = {
    type:UserType,
    args:{
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phonenumber:{type:GraphQLString},
        password:{type:GraphQLString},
        role:{type:GraphQLString},
    },
    resolve:async(parent,args,context,info) => {
      try {
          args.password = bcrypt.hashSync(args.password, 10);
          const user = await User.create(args);
          return user; 
      } catch (error) {
          throw new Error(error)
      }
    }

};




const loginUser = {
    type:UserType,
    args:{
        email:{type:GraphQLNonNull(GraphQLString)},
        password:{type:GraphQLNonNull(GraphQLString)}
    },
    resolve:async(parent, args, context, info)=>{
        const {email,password}=args;
        const user = await User.findOne({where:{email}});

        if(!user){
            throw new Error("User Not found Try Again!!...")
        }

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            throw new Error("Invalid Password..Please check again")
        }

        //generateToken 
        const token = userServices.generateToken(user.id); 
        context.token=token;       
        return ({message:"successfully user login",token})

        
    }
}

const logoutUser = {
    type: GraphQLString,
    resolve: async (parent, args, context, info) => {
      // Clear the token from the context or session
      context.token = null;
      return "Logout successful";
    }
  };

  

module.exports = {
    createUser,loginUser,logoutUser
}