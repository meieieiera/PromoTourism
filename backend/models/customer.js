const mongoose=require('mongoose');

const reviewTourSchema=mongoose.Schema({
    tourId:{type:mongoose.Schema.Types.ObjectId, ref:'Tour', required:true},
    id: {type:Number, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    stars:{type:Number,required:true},
    imageUrl:{type:String,required:true},
    date:{type:String,required:true},
    pax:{type:Number,required:true}
});

const customerSchema=mongoose.Schema({
    name:{type:String,required:true},
    // email:{type:String, required:true},
    // password:{type:String,required:true},
    number:{type:String,required:true},
    reviewTours:[reviewTourSchema],
    userId:{type:String,required:true}//reference to user
});

// Create models for the schemas
const Customer = mongoose.model('Customer', customerSchema);
const ReviewTour = mongoose.model('ReviewTour', reviewTourSchema);

module.exports = { Customer, ReviewTour};