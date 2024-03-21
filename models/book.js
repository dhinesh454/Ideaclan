const Sequelize = require('sequelize');
const sequelize = require('../utilis/database');


const Book=sequelize.define('books',{

    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    author:
    {
        type:Sequelize.STRING,
        allowNull:false

    },
    genre:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    isavailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true // Use defaultValue instead of default
    }


});

module.exports=Book;
