const router=require('express').Router();

const chat=require('../models/chat ')

router.post('/save',async (req,res)=>{
    const newChat=chat({
        name:req.body.name,
        message:req.body.message
    });
    try{
        const saveChat=await newChat.save();
        return res.status(200).send({success:true,chat:saveChat})
    }
    catch(error){
        return res.status(400).send({success:false,msg:error});
    }
})

router.get('/getAll',async(req,res)=>{
    //.sort({createdAt: -1})
        const data=await chat.find().sort({createdAt: -1});
        if(data){
          return res.status(200).send({success:true,chat:data});
            }else{
                return res.status(400).send({success:false,msg:"No data right now"});
            }
    
})

module.exports=router;