const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    date: { type: String, required: true },
    pax: { type: Number, required: true },
    merchantId: { type:String , required:true}, // Reference to the merchant
});

module.exports=mongoose.model('Tour',tourSchema);
