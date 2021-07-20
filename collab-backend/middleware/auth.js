const User=require("../models/user");
const jwt=require("jsonwebtoken");

const auth=async function(req,res,next){
   try {
       //const token=req.header("Authorization").replace("Bearer ","");
        let token = req.headers["x-access-token"];
       const decoded=jwt.verify(token,"collab");

       const user=await User.findOne({_id:decoded._id});
        if(!user){
            throw new Error();
         }
     req.user=user;
    next();
   } catch (e) {
       res.status(401).send({Error:"Please authenticate"});
   }
}

module.exports=auth;