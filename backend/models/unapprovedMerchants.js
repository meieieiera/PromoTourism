const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const documentSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    fileReference: { type: String, required: true }
});

const unapprovedMerchantSchema = mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    contactNum:{type:String,required:true},
    email:{type:String, required:true},
    description:{type:String,required:true},
    documents:[documentSchema],
    status: {type:String, required:true}
})

unapprovedMerchantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Unapproved Merchant', unapprovedMerchantSchema); 
