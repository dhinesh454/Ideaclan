const jwt = require('jsonwebtoken');


const generateToken = (id) =>{
 return jwt.sign({userId:id},process.env.JSW_WEB_TOKEN_SECRETKEY)
}

module.exports={generateToken};