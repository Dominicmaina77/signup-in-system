const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports= async(req,res,next)=>{
    // try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const isCustomAuth = token.length < 500;
    //     let decodedData;
    //     if(token && isCustomAuth){
    //         decodedData = jwt.verify(token,'secret');
    //         req.userId = decodedData?.id;
    //     }
    //     next();
    // } catch (error) {
    //     // console.log(error);
    //     res.status(403).send({message:"Unauthorized access"});
    // }

    try {
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).send({message:"Unauthorized access"});
        }
        const payload = jwt.verify(jwtToken,process.env.jwtSecret);
        req.user=payload.user;
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Unauthorized access");
    }
}