const express=require ('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Customer=require('./models/customer');
const Merchant=require('./models/merchants');
const Tour=require('./models/tour');
const User=require('./models/user');

const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const checkAuth=require("./middleware/check-auth");

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
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
  //get tours
// app.get("/api/tours", (req, res, next) => {
//   let mercId;
//   Merchant.find({id:1}).then((merchant)=>{
//     mercId=(merchant[0]._id).toString();
//     // mercId=merchant[0].id;
//     // console.log(merchant[0]._id)
//     console.log(mercId)
//     Tour.find({merchantId:mercId})
//     .then((documents) => {
//       console.log(documents)
//       res.status(200).json({
//         message: 'Tour fetched successfully',
//         tours: documents
//       });
//     })
//     .catch((error) => {
//       console.error('Error fetching tours:', error);
//       res.status(500).json({
//         message: 'Error fetching tours'
//       });
//     });
//   });

  
// });
//   //get tours from officer>merchants
// app.get("/api/omTours", (req, res, next) => {
//     Officer.find()
//       .then((documents) => {
//         console.log('Got the officer');
//         console.log(documents);
//         res.status(200).json({
//           message: 'Tour fetched successfully',
//           officers: documents
//         });
//       })
//       .catch((error) => {
//         console.error('Error fetching tours:', error);
//         res.status(500).json({
//           message: 'Error fetching tours'
//         });
//       });
//   });

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
    console.log(req.params.id);
    ReviewTour.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Review tour deleted!",
            id:req.params.id
        });
    })
});
//login post
app.post('/api/user/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email})
  .then(user=>{
      console.log(user);
      console.log(req.body.password);
      console.log(user.password);
      if(!user){
          return res.status(401).json({
              message:'Auth failed'
          });
      }
      fetchedUser=user
      return bcrypt.compare(req.body.password,user.password)
      // if (!bcrypt.compare(req.body.password,user.password)){
      //   return req.body.password===user.password
      // }
  })
  .then(result=>{
      console.log(result);
      if(!result){
          return res.status(401).json({
              message: 'Auth failed'
          });
      }
      const token=jwt.sign(
          {email:fetchedUser.email,userId:fetchedUser._id},
          'this_secret',
          {expiresIn: '1h'}
      )
      res.status(200).json({
          token: token,
          user:fetchedUser
      })
  })
  .catch(err=>{
      return res.status(401).json({
          message:'Auth failed'
      });
  })
})



module.exports=app;