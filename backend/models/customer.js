const mongoose=require('mongoose');

const customerSchema=mongoose.Schema({
    name:{type:String,required:true},
    number:{type:String,required:true},
    reviewTours:[{type:String}],
    userId:{type:String,required:true}//reference to user
});

module.exports=mongoose.model('Customer', customerSchema);
