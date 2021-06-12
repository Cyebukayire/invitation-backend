
const jwt = require('jsonwebtoken');
const {User} = require('../models/user.model')
exports.auth = async(req,res,next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = (req.headers.authorization).split(' ')[1];
        }
            if(!token) return res.send({success: false,message:"Not token found"}).status(404);

            try{
                const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
                if(decoded){
                    req.user =  await User.findOne({_id:decoded.id})
                    next();
                }
            }catch(e){return res.send({success:false,data:e.message})} //catch the error of  invalid token

        
    }catch(e){return res.send({success:false,data:e.message})}
}