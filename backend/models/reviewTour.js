const { Double } = require('mongodb');
const mongoose=require('mongoose');

const reviewTourSchema = mongoose.Schema({
    id: {type:Number, required:true},
    name:{type:String, required:true},
    //description:{type:String, required:true},
    price:{type:Number, required:true},
    // stars:{type:Number,required:false},
    imageUrl:{type:String,required:true},
    date:{type:String,required:true},
    pax:{type:Number,required:true}
});
module.exports=mongoose.model('ReviewTour',reviewTourSchema);