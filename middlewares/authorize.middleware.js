const jwt=require("jsonwebtoken")

const authorize=(req,res,next)=>{
let token=req.headers.authorization
    if(token){
        let decoded = jwt.verify(token, 'motors');
    if(decoded){ 
        let userID=decoded._id
        //console.log(userID); 
        req.body.userID=userID
        //console.log(req.body);
        next()
    }else{
        res.send("Please Sign In First")
    }
    }else{
        res.send("Please Sign In First")
    }

}
module.exports ={
    authorize
}