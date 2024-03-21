const Sequelize=require('sequelize');

const sequelize=new Sequelize(process.env.SQL_DB_NAME,process.env.SQL_DB_USER,process.env.SQL_DB_PASSWORD,
{
    dialect:"mysql",
    host:process.env.SQL_DB_HOST
});

module.exports=sequelize;