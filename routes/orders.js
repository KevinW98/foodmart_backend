const express = require('express');
const {getOrders,deleteOrder,placeOrder}=require('../controllers/orders');
const router = express.Router({mergeParams: true});
const {protect,authorize}= require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Order = require('../models/Order');

router
    .route('/')
    .get(protect,authorize('admin', 'customer'),
        advancedResults(Order,{path:'customer',select:'name'}),getOrders)
    .post(protect,authorize('customer'),placeOrder)


router
    .route('/:id')
    .delete(protect,authorize('admin'),deleteOrder);


module.exports = router;
