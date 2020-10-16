const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now()
    },
    customer:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    content:[{
         item:{
             type:mongoose.Schema.ObjectId,
             ref:'Item',
             required:true
         },
        quantity:{type:Number,
            required:true}
    }]
});

module.exports = mongoose.model('Order',OrderSchema);