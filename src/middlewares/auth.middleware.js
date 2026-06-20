const jwt=require('jsonwebtoken');

async function authArtist(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
       if(decoded.role!=="artist"){
        return res.status(401).json({message:"you are not authorized"});
       }
       req.user=decoded;
       next();
    }
    catch(error){
        return res.status(401).json({message:"unauthorized"});
    }
}
async function authUser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        if(decoded.role!=="user"){
            return res.status(401).json({message:"you are not authorized"});
        }
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(401).json({message:"unauthorized"});
    }
}
module.exports={authArtist, authUser};