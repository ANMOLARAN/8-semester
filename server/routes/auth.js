const router=require("express").Router();
const admin=require('../config/firebase.config');
const user=require('../models/user')

router.get('/login',async(req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).send({message:"invalid token"})
    }
    const token=req.headers.authorization.split(" ")[1];
    try{
    const decodeValue=await admin.auth().verifyIdToken(token);    
    if(!decodeValue){
        console.log("false");
        return res.status(505).json({message:"Un Authorized"});
    }else{
       //checking user exists or not
       const userExists=await user.findOne({"user_id":decodeValue.user_id})
       if(!userExists){
        newUserData(decodeValue,req,res);
       }else{
        updateNewUserData(decodeValue,req,res);
       }
    }
    }
    catch(error){
        console.log("true");
        return res.status(505).json({message:error});
    }
})

const newUserData=async(decodeValue,req,res)=>{
    const newUser=new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    })

    try{
        const savedUser=await newUser.save();
        res.status(200).send({user:savedUser})
    }catch(error){
        res.status(400).send({success:false,msg:error});
    }
    }

 const updateNewUserData= async (decodeValue,req,res)=>{
   const filter={user_id:decodeValue.user_id};
   const options={
    upsert:true,
    new:true
   };

   try{
    const result=await user.findOneAndUpdate(
        filter,
        {auth_time:decodeValue.auth_time},
        options
    );
    res.status(200).send({user:result})
   }catch(error){
    res.status(400).send({success:false,msg:error});
   }
 }

 //to get all artist data
router.get('/getAll',async(req,res)=>{
    const data=await user.find().sort({createdAt: -1});
    if(data){
      return res.status(200).send({success:true,user:data});
        }else{
            return res.status(400).send({success:false,msg:"Data not found"});
        }
});

//to update the user role admin or member
router.put('/updateRole/:userId',async(req,res)=>{
    const filter={_id:req.params.userId};
    const role=req.body.data.role;
    try{
     const result=await user.findOneAndUpdate(filter,{role:role});
      res.status(200).send({success:true, data:result})
    }catch(error){
     return res.status(400).send({success:false,msg:error})
}
})

//to delete the user
router.delete('/deleteUser/:userId',async(req,res)=>{
    const filter={_id:req.params.userId};
    try{
   const result=await user.deleteOne(filter);
   res.status(200).send({success:true, data:result})
    }catch(error){
        return res.status(400).send({success:false,msg:error})
    }
})


module.exports=router;