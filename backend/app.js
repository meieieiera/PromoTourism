const express=require ('express');
const bodyParser=require('body-parser');
const Tour = require('./models/tour');
const mongoose=require('mongoose');

const app=express();

mongoose.connect("mongodb+srv://alicia:123@cluster0.zhtdg9k.mongodb.net/?retryWrites=true&w=majority")
.then ( ()=> {
  console.log ("Connected to Mongo DB");
})
.catch(()=>{
    console.log('connection failed');
});

app.unsubscribe(bodyParser.json());

app.use((req,res,next)=>{
    console.log('First middleware');
    next();
})
app.use((req,res,next)=>{
    res.send('Hello from express yoh')
});
app.use((req,res,next)=>{
   
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

app.post("/api/tours",(req,res,next)=>{
    const tour = new Tour({
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        rating:req.body.rating,
        imageUrl:req.body.imageUrl
    });

    res.status(201).json({
        message:'Tour added successfully'
    })
})

module.exports=app;