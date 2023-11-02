// const { Double } = require('mongodb');
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, requires:true},
    userType:{type:String, required:true}

});

module.exports=mongoose.model('User',userSchema);