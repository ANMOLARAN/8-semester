const router=require('express').Router();

//get song schema
const song=require('../models/song')

//to save the song data
router.post('/save',async(req,res)=>{
    const newSong=song(
        {
            name:req.body.name,
            imageURL:req.body.imageURL,
            songURL:req.body.songURL,
            album:req.body.album,
            artist:req.body.artist,
            language:req.body.language,
            category:req.body.category
        }
    );

    try{
    const savedSong=await newSong.save();
    return res.status(200).send({success:true,song:savedSong});
    }
    catch(error){
     return res.status(400).send({success:false,msg:error});
    }
});

//to get One song data
router.get('/getOne/:id',async(req,res)=>{
    const filter={_id:req.params.id};
    const data=await song.findOne(filter);
    if(data){
    return res.status(200).send({success:true,song:data});
    }else{
        return res.status(400).send({success:false,msg:"Data not found"});
    }
});


//to get all song data
router.get('/getAll',async(req,res)=>{
    const data=await song.find().sort({createdAt: -1});
    if(data){
      return res.status(200).send({success:true,song:data});
        }else{
            return res.status(400).send({success:false,msg:"Data not found"});
        }
});

//to update a song data
router.put('/update/:id',async(req,res)=>{
    const filter={_id:req.params.id};

    const options={
        upsert:true,
        new:true
    };

    try{
    const result=await song.findOneAndUpdate(filter,{
        name:req.body.name,
        imageURL:req.body.imageURL,
        songURL:req.body.songURL,
        album:req.body.album,
        artist:req.body.artist,
        language:req.body.language,
        category:req.body.category
    },options);
    return res.status(200).send({success:true,data:result});
    }catch(error){
    return res.status(400).send({success:false,msg:error});
    } 
});

//to delete a song data
router.delete('/delete/:id',async(req,res)=>{
    const filter={_id:req.params.id};
    const result=await song.deleteOne(filter);
    if(result){
        return res.status(200).send({success:true,msg:"Data deleted successfully"});
        }else{
            return res.status(400).send({success:false,msg:"Data not found"});
        }
    
});

module.exports=router;