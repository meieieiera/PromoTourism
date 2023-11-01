const { Double } = require('mongodb');
const mongoose=require('mongoose');

const tourSchema=mongoose.Schema({
    id: {type:Number, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    quantity:{type:Number,required:true},
    price:{type:Number, required:true},
    stars:{type:Number,required:true},
    imageUrl:{type:String,required:true},
    date:{type:String,required:true},
    pax:{type:Number,required:true}
});

const documentSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    file:{type:String,required:true}
});

const merchantSchema=mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    number:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    description:{type:String,required:true},
    documents:[documentSchema],
    tours:[tourSchema]
});

const officerSchema = mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String,required:true},
    merchants:[merchantSchema]
});

// Create models for the schemas and export them
const Officer = mongoose.model('Officer', officerSchema);
const Merchant = mongoose.model('Merchant', merchantSchema);
const Document = mongoose.model('Document', documentSchema);
const Tour = mongoose.model('Tour', tourSchema);

module.exports = {
  Officer,
  Merchant,
  Document,
  Tour,
};