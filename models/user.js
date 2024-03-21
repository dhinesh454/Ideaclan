const Sequelize = require('sequelize');
const sequelize = require('../utilis/database');


const User=sequelize.define('users',{

    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    email:
    {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,

    },
    phonenumber:
    {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:
    {
     type:Sequelize.STRING,
     allowNull:false   
    },
    role:
    {
     type:Sequelize.STRING,
     allowNull:false   
    }
});

module.exports=User;