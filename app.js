const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const cors = require('cors');
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const {GraphQLObjectType, GraphQLSchema} = require('graphql')

const sequelize = require('./utilis/database');
const User = require('./models/user');
const Book = require('./models/book');
const Action = require('./models/action');
const userMutations = require('./graphql/user/mutation');
const bookMutations = require('./graphql/books/mutation');
const bookQuery = require('./graphql/books/query');
const userQuery = require('./graphql/user/query');
const actionQuery = require('./graphql/action/query')

const Query = new GraphQLObjectType({
    name:"Query",
    fields :() =>({
       ...userQuery,
       ...bookQuery,
       ...actionQuery
    })
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields :()=>({
        ...userMutations,...bookMutations
    })
})




app.use(cors());
app.use(bodyParser.json())
//listen to the graphql
app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema:new GraphQLSchema({
        query:Query,
        mutation:Mutation

    }),
    context: ({ req }) => ({ token: req.headers.authorization }) 
}))






//Association 
User.hasMany(Action)
Action.belongsTo(User)

Book.hasOne(Action);
Action.belongsTo(Book);


sequelize.sync()
.then((res)=>{
    app.listen(3000,()=>console.log('server starts!!!....'))
})
.catch(err=>console.log(err))