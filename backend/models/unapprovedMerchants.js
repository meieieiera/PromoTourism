const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const unapprovedMerchantSchema = mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    contactNum:{type:String,required:true},
    email:{type:String, required:true},
    description:{type:String,required:true},
    documents:[documentSchema],
    staus: {type:String, required:true}
})

const documentSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true}
    //file:{type:String,required:true}
});

unapprovedMerchantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Unapproved Merchant', unapprovedMerchantSchema); 
