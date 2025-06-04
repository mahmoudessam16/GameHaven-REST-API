import JWT from 'jsonwebtoken';
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized access, token is missing"});
    }

    try {
        const decoded=JWT.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized access, invalid token"});
    }
}

export default auth;
