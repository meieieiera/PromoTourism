const express=require ('express');
const bodyParser=require('body-parser');
const Tour = require('./models/tour');
const mongoose=require('mongoose');
const ReviewTour=require('./models/reviewTour');

const app=express();

mongoose.connect("mongodb+srv://alicia:123@cluster0.zhtdg9k.mongodb.net/?retryWrites=true&w=majority")
.then ( ()=> {
  console.log ("Connected to Mongo DB");
})
.catch(()=>{
    console.log('connection failed');
});

app.use(bodyParser.json());

app.use((req,res,next)=>{
   
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});
//add tours to review
app.post("/api/rtours",(req,res,next)=>{
    console.log("r tour reached")
    const rtour = new ReviewTour({
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        // stars:req.body.rating,
        imageUrl:req.body.imageUrl,
        date:req.body.date,
        pax:req.body.pax
    })
    rtour.save().then(createdTour=>{
        console.log("added tour")
        res.status(201).json({
            message:'Tour to review added successfully '+createdTour._id,
            tourId:createdTour._id
        });
    })
    .catch(error => {
        console.error('Error saving tour:', error);
        res.status(500).json({
          message: 'Failed to add the tour to the database'
        });
      });

})

//get tours
app.get("/api/tours", (req, res, next) => {
    Tour.find()
      .then((documents) => {
        console.log('Got the tours');
        res.status(200).json({
          message: 'Tour fetched successfully',
          tours: documents
        });
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
        res.status(500).json({
          message: 'Error fetching tours'
        });
      });
  });

//get review tours
app.get("/api/rtours", (req, res, next) => {
    ReviewTour.find()
      .then((documents) => {
        console.log('Got review tours');
        res.status(200).json({
          message: 'Review tour fetched successfully',
          reviewTours: documents
        });
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
        res.status(500).json({
          message: 'Error fetching tours'
        });
      });
  });
  
//delete post
app.delete('/api/rtour/:id',(req,res,next)=>{
    ReviewTour.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Review tour deleted!",
            id:req.params.id
        });
    })
});


module.exports=app;