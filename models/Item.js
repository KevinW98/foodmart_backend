const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:true,
        trim:true,
        maxLength:[50,'Name can not be longer than 50 characters']},
    price:{
        type:Number,
        require:[true,'Please add a price for this item']
    },
    image_url:{
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ],
        required: [true,'Please add a link of image for this item']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    }

});

module.exports = mongoose.model('Item',ItemSchema);