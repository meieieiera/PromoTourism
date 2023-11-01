const { Double } = require('mongodb');
const mongoose=require('mongoose');

const tourSchema = mongoose.Schema({
    id: {type:Number, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    rating:{type:Number,required:false},
    imageUrl:{type:String,required:true},
    // date:{type:String,required:true},
    // pax:{type:Number,required:true}
});
module.exports=mongoose.model('Tour',tourSchema);