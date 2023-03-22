const express=require('express');
const cors=require('cors');
const { default:mongoose }=require('mongoose');
require('dotenv/config');
const app=express();

app.use(cors({origin:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hi anmol");
})

//User Authentication route
const userRoute=require('./routes/auth')
app.use('/api/users/',userRoute);

//artist routes
const artistsRoutes=require('./routes/artist');
app.use('/api/artists/',artistsRoutes);

//album routes
const albumRoutes=require('./routes/album');
app.use('/api/albums/',albumRoutes);

//song routes
const songRoutes=require('./routes/songs');
app.use("/api/songs/",songRoutes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.syha3im.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});
mongoose.connection
.once('open',()=>console.log("Connected"))
.on('error',(error)=>{
    console.log(`ERROR:${error}`);
})

app.listen(4000,()=>{
    console.log("listening at port 4000")
})