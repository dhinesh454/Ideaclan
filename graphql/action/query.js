const {GraphQLInt,GraphQLList} = require("graphql");
const ActionType = require("./typeDef");
const Action = require('../../models/action');

const getAllActions = {
    type: new GraphQLList(ActionType),
    resolve: async (parent, args, context, info) => {
     try {
           const actions= await Action.findAll();
           return actions;
     } catch (error) {
           throw new Error(error)
     }
    }
}

const getAction ={
    type:ActionType,
    args:{
        id:{type:GraphQLInt},
    },
    resolve:async (parent,args,context,info) => {
        try {
            const action = await Action.findByPk(args.id);
            if(!action) throw new Error('Not found!..please check again ')
            return action;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports={ getAction, getAllActions}