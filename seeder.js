const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config({path:'./config/config.env'});

//Load models
const Category = require('./models/Category');
const Item = require('./models/Item');
const User = require('./models/User');
const Order = require('./models/Order');

//Connect to database
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
});

//Read JSON Files
const categories = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`,'utf-8'));

const items = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/items.json`,'utf-8'));

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8'));

const orders = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/orders.json`,'utf-8'));


//Import Into Database
const importData = async ()=>{
    try{
        await Category.create(categories);
        await Item.create(items);
        await User.create(users);
        await Order.create(orders);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    }catch (err) {
        console.error(err);
    }
}

//Delete data from database
const removeData = async ()=>{
    try{
    await Category.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    console.log('Data removed...'.red.inverse);
    process.exit();
}catch (err) {
       console.error(err);
    }}

if(process.argv[2]==='-i'){
    importData();
}else if(process.argv[2] === '-d'){
    removeData();
}