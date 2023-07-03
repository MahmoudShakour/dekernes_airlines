const { isUserExists } = require("../database/queries/queries");
const bcrypt=require("bcrypt");

async function AuthUser(req,res,next){
    const foundUser=await isUserExists(req.body.username);
    
    if(foundUser.length>0){
        bcrypt.compare(req.body.password,foundUser[0].password,(err,same)=>{
            if(same){
                req.user=foundUser[0];
                next();
            }
            else{
                res.status(401).json({message:"invalid username or password"});
            }
        })
    }
    else{
        res.status(401).json({message:"invalid username or password"});
    }
}

module.exports=AuthUser;