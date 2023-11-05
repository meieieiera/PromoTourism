const mongoose=require('mongoose');

const documentSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    file:{type:String,required:true}
});
const merchantSchema=mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    number:{type:String,required:true},
    description:{type:String,required:true},
    documents:[documentSchema],
    tours:[{type:String}],
    userId:{type:String,required:true},//reference to user
    productsSold:{type:Number, required:true},
    revenue:{type:Number,required:true}
});

module.exports=mongoose.model('Merchant',merchantSchema);