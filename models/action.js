const Sequelize = require('sequelize');
const sequelize = require('../utilis/database');


const Action=sequelize.define('actions',{

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
    action:{
        type: Sequelize.STRING
    },
    borrowrequest: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
    },
    requestId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        defaultValue: null 
    }
    

});

module.exports=Action;