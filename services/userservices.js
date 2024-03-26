const jwt = require('jsonwebtoken');


const generateToken = (id) =>{
 return jwt.sign({userId:id},process.env.JSW_WEB_TOKEN_SECRETKEY)
}

const authorizeToken = (context) => {
    const token = context.token;
    if (!token) {
        throw new Error("Authorization token is required!!.Please Login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY);
        context.userId = decoded.userId;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

module.exports={generateToken,authorizeToken};