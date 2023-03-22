const mongoose=require('mongoose');

const albumSchmea=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
},
{timestamps:true}
);

module.exports=mongoose.model('album',albumSchmea);