const express=require ('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Customer=require('./models/customer');
const Merchant=require('./models/merchants');
const Tour=require('./models/tour');
const User=require('./models/user');
const UnapprovedMerchant=require('./models/unapprovedMerchants')

const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const checkAuth=require("./middleware/check-auth");
const shortid = require('shortid');
const generator = require('generate-password');
const multer = require("multer");  
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });



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
  const tourId = req.body.tourId;
  const customerId = req.body.customerId;
  Customer.findOne({ userId: customerId })
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found'
        });
      }

      // Step 2: Retrieve the customer's existing list of tour IDs
      const existingTourIds = customer.reviewTours;

      // Step 3: Add the new tourId to the list (if it's not already there)
      if (!existingTourIds.includes(tourId)) {
        existingTourIds.push(tourId);
      }

      // Step 4: Update the customer document with the new list of tour IDs
      customer.reviewTours = existingTourIds;
      return customer.save();
    })
    // .then((updatedCustomer) => {
    //   res.status(200).json({
    //     message: 'Tour added successfully'
    //     // customer: updatedCustomer
    //   });
    // })
    .catch((error) => {
      console.error('Error adding tour:', error);
      res.status(500).json({
        message: 'Error adding tour'
      });
    });
});

//get all tours
app.get("/api/tours", (req, res, next) => {
    Tour.find()
      .then((documents) => {
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

//get tour by merchant id
app.get('/api/toursByMerchant/:merchantId', (req, res, next) => {
  const merchantId = req.params.merchantId;
  Tour.find({ merchantId: merchantId }) // Assuming there's a field called merchantId in your Tour model
  .then((documents) => {
    res.status(200).json({
      message: 'Tours fetched successfully',
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



  //get all merchants
app.get("/api/merchants", (req, res, next) => {
  Merchant.find()
    .then((merchants) => {
      res.status(200).json({
        message: 'Merchants fetched successfully',
        merchants: merchants
      });
    })
    .catch((error) => {
      console.error('Error fetching merchants:', error);
      res.status(500).json({
        message: 'Error fetching merchants'
      });
    });
});

  //get merchant by user id
app.get("/api/merchant/:uid", (req, res, next) => {
  Merchant.findOne({userId:req.params.uid})
    .then((merchant) => {
      res.status(200).json({
        message: 'Merchant fetched successfully',
        merchant: merchant
      });
    })
    .catch((error) => {
      console.error('Error fetching merchant:', error);
      res.status(500).json({
        message: 'Error fetching merchant'
      });
    });
});
  

//get review tours
app.get("/api/rtours/:custId", (req, res, next) => {
  const customerId = req.params.custId; // Get the customer ID from the request parameters

  //Find the customer by their userId
  Customer.findOne({ userId: customerId })
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found'
        });
      }

      //Retrieve list of tour IDs from the customer's reviewTours
      const tourIdsToReview = customer.reviewTours;
      const tourIdsAsObjectId = tourIdsToReview.map((tourId) => new mongoose.Types.ObjectId(tourId));

      //Find tours in the Tour collection based on the retrieved tour IDs
      Tour.find({ _id: { $in: tourIdsAsObjectId } })
        .then((tours) => {
          // tours will contain an array of tour documents
          res.status(200).json({
            message: 'Review tours retrieved successfully',
            reviewTours: tours
          });
        })
        .catch((error) => {
          console.error('Error fetching tours:', error);
          res.status(500).json({
            message: 'Error fetching tours'
          });
        });
    })
    .catch((error) => {
      console.error('Error fetching customer:', error);
      res.status(500).json({
        message: 'Error fetching customer'
      });
    });
});
//update tour with review and comments
app.put("/api/updateTour",(req,res,next)=>{
  const tourId = req.body.tourId;
  const rating=req.body.rating;
  const newComments=req.body.comment;
  const tourIdAsObjectId = new mongoose.Types.ObjectId(tourId);
  Tour.findOne({_id:tourIdAsObjectId}).then((tour)=>{
    if (!tour) {
      // Handle the case when the tour is not found
      return res.status(404).json({
        message: 'Tour not found',
      });
    }

    // Update the tour's rating and comments
    tour.stars = rating;
    tour.comments.push(newComments);

    // Save the updated tour
    return tour.save().then((updatedTour) => {
      res.status(200).json({
        message: 'Tour updated successfully',
        tour: updatedTour,
      });
    });
  }).catch((error) => {
    console.error('Error updating tour:', error);
    res.status(500).json({
      message: 'Error updating tour',
    });
  });
});

//update tour object as merchant
app.put("/api/updateTourProduct",(req,res,next)=>{
  const tourId = req.body.tourId;
  const tourIdAsObjectId = new mongoose.Types.ObjectId(tourId);
  Tour.findOne({_id:tourIdAsObjectId}).then((tour)=>{
    if (!tour) {
      // Handle the case when the tour is not found
      return res.status(404).json({
        message: 'Tour not found',
      });
    }

    // Update the tour's rating and comments
    tour.stars = rating;
    tour.comments.push(newComments);
    tour.name.push(req.body.name);
    tour.description.push(req.body.description);
    tour.price.push(req.body.price);
    tour.quantity.push(req.body.quantity);


    // Save the updated tour
    return tour.save().then((updatedTour) => {
      res.status(200).json({
        message: 'Tour updated successfully',
        tour: updatedTour,
      });
    });
  }).catch((error) => {
    console.error('Error updating tour:', error);
    res.status(500).json({
      message: 'Error updating tour',
    });
  });
});

//Remove Unapproved Merchants
app.delete('/api/deleteTour/:id', (req, res, next) => {
  Tour.deleteOne({id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: 'Tour deleted successfully'
    });
  })
})
  
//remove tour from customer review list
app.put('/api/removeRtour',(req,res,next)=>{
    const tourId=req.body.tourId;
    const customerUserId=req.body.customerUserId;
    Customer.findOneAndUpdate(
      { userId: customerUserId },
      { $pull: { reviewTours: tourId } },
      { new: true }
  )
  .then((customer) => {
      if (!customer) {
          return res.status(404).json({
              message: 'Customer not found'
          });
      }

      res.status(200).json({
          message: 'Tour removed successfully',
          customer: customer
      });
  })
  .catch((error) => {
      console.error('Error removing tour:', error);
      res.status(500).json({
          message: 'Error removing tour'
      });
  });
});

//login 
app.post('/api/user/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email})
  .then(user=>{
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

//register customer
app.post('/api/registerCustomer',(req,res,next)=>{
  console.log("email from backend below")
  console.log(req.body.email);
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const user = new User({
      email:req.body.email,
      password:hash,
      userType:'customer'
    });
    user.save().then(user=>{
      console.log('user created below')
      console.log(user)
    })
    return user
  })
  .then(user=>{
    const customer = new Customer({
      name:req.body.name,
      number:req.body.contact,
      reviewTours:[],
      userId:user._id.toString()
    });
    customer.save().then(customer=>{
      res.status(201).json({
        message:'Customer registered'
      })
    })
  })
})

//update analysis
app.put('/api/updateAnalysis',(req,res,next)=>{
  let price;
  const tourIdAsObjectId = new mongoose.Types.ObjectId(req.body.tourId);
  Tour.findOne({ _id: tourIdAsObjectId })
    .then((tour) => {
      tour.quantity = tour.quantity - 1;
      price = tour.price; // Assign a new value to price
      return tour.save();
    })
    .then((updatedTour) => {
      console.log("updated tour below");
      console.log(updatedTour);
      const merchantid=updatedTour.merchantId;
      const merchantIdAsObjectId = new mongoose.Types.ObjectId(merchantid);
      return Merchant.findOne({ _id: merchantIdAsObjectId });
    })
    .then((merchant) => {
      console.log("merchant below")
      console.log(merchant)
      merchant.revenue = merchant.revenue + price;
      merchant.productsSold = merchant.productsSold + 1;
      return merchant.save();
    })
    .then((updatedMerchant) => {
      console.log("updated merchant below");
      console.log(updatedMerchant);
      res.status(200).json({
        message: 'Analysis updated',
      });
    })
    .catch((error) => {
      console.error('Error updating analysis:', error);
      res.status(500).json({
        message: 'Error updating analysis',
      });
    });
});

  //get all unapprovedMerchants
  app.get("/api/unapprovedMerchant", (req, res, next) => {
    UnapprovedMerchant.find()
      .then((unapprovedMerchants) => {
        res.status(200).json({
          message: 'Unapproved merchants fetched successfully',
          unapprovedMerchant: unapprovedMerchants
        });
      })
      .catch((error) => {
        console.error('Error fetching unapproved merchants:', error);
        res.status(500).json({
          message: 'Error fetching unapproved merchants'
        });
      });
  });

  // register unapproved merchants
  app.post('/api/unapprovedMerchant', upload.array('documents'), (req, res, next) => {
    const mId = shortid.generate();
  
    const files = req.body.documents; // Use req.files instead of req.body.documents
  
    const unapprovedMerchant = new UnapprovedMerchant({
      id: mId,
      name: req.body.name,
      contactNum: req.body.contactNum,
      email: req.body.email,
      description: req.body.description,
      documents: files.map(file => ({
        name: file.name,
        description: file.description || '', // Add a default value for description
        fileReference: 'uploads/'+ file.name + Date().toString().replace(/\s/g, "")
      })),
      status: 'PENDING',
    });
  
    unapprovedMerchant.save()
      .then((savedMerchant) => {
        console.log('Merchant created below');
        res.status(201).json({
          message: 'Merchant registered',
          createdMerchant: savedMerchant,
        });
      })
      .catch(error => {
        console.error('Error registering merchant:', error);
        res.status(500).json({
          error: 'Internal Server Error',
        });
      });
  });

//Remove Unapproved Merchants
app.delete('/api/unapprovedMerchant/:id', (req, res, next) => {
  UnapprovedMerchant.deleteOne({id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: 'Merchant deleted successfully'
    });
  })
})

//Create Merchant Login 
app.post('/api/merchant/registerMerchant',(req,res,next)=>{
  console.log("email from backend below")
  console.log(req.body.email);
  /*const password = generator.generate({ 
    length: 10, 
    numbers: true
}); */
 const password = '123';
console.log(password);
  bcrypt.hash(password,10)
  .then(hash=>{
    const user = new User({
      email:req.body.email,
      password:hash,
      userType:'merchant'
    });
    user.save().then(user=>{
      console.log('merchant user created below')
      console.log(user)
    })
    return user
  })
  .then(user=>{
    const merchant = new Merchant({
      id: req.body.id,
      name:req.body.name,
      number:req.body.number,
      description:req.body.description,
      documents:req.body.documents || [],
      tours:[],
      userId:user._id.toString(),//reference to user
      productsSold:0,
      revenue:0
    });
    console.log(merchant);
    merchant.save().then(()=>{
      res.status(201).json({
        message:'Merchant registered'
      })
    })
    .catch(error => {
      console.error('Error registering merchant:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    });
  })
});

//Add Tour
app.post('/api/addTour', upload.single('image'), (req, res) => {
  // Get the filename of the uploaded image
  const image = req.file.filename;

  // Save the data to MongoDB
  const tourData = new Tour({
    id: 1,
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
  quantity: req.body.quantity,
  price: req.body.price,
  stars: 0,
  imageUrl: image,
  date: '12/12/2023',
  pax: 2,
  comments: '',
  merchantId: req.body.merchantId
  });

  tourData.save((err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Tour saved successfully');
    }
  });
});



module.exports=app;

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
// //add tours to review
// app.post("/api/rtours",(req,res,next)=>{
//     console.log("r tour reached")
//     const rtour = new ReviewTour({
//         id:req.body.id,
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         // stars:req.body.rating,
//         imageUrl:req.body.imageUrl,
//         date:req.body.date,
//         pax:req.body.pax
//     })
//     rtour.save().then(createdTour=>{
//         console.log("added tour")
//         res.status(201).json({
//             message:'Tour to review added successfully '+createdTour._id,
//             tourId:createdTour._id
//         });
//     })
//     .catch(error => {
//         console.error('Error saving tour:', error);
//         res.status(500).json({
//           message: 'Failed to add the tour to the database'
//         });
//       });

// })
// const customerIdAsObjectId = new mongoose.Types.ObjectId(customerId);
// app.post("/api/rtours",(req,res,next) => {
//   console.log("r tour reached")
//   const tourId = req.body.tourId;
//   const customerId = req.body.customerId;
//   console.log(customerIdAsObjectId);
//   Customer.findOne({ userId: customerId })
//     .then((customer) => {
//       console.log(customer);
//       res.status(200).json({
//         message: 'Customer found',
//       });
//     })
//     .catch((error) => {
//       console.error('Error fetching customer:', error);
//       res.status(500).json({
//         message: 'Error fetching customer'
//       });
//     });
// });