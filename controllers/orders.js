const ErroeResponse = require('../utils/errorResponse');
const asyncHandler= require('../middleware/async');
const Order = require('../models/Order');
const User = require('../models/User');
const Item = require('../models/Item');


// @desc     Get orders
// @route    GET /api/v1/orders
// @route    GET /api/v1/users/:userId/orders
// @access   Private
exports.getOrders = asyncHandler(async (req,res,next)=>{
    if(req.params.orderId){
        console.log('Hey');
        console.log(req.user);
        const orders = await Order.find({customer:req.params.orderId});
        if(orders.length == 0)res.status(200).json({
            success:true,
            message:'No order found'
        })

        // Ensure only the customer placed the order and admin have access
        if(orders.length != 0){
            if(orders[0].customer.toString() != req.user.id && req.user.role !='admin'){
                return next(new ErroeResponse("No authorized to access this customer's orders",401));
            }

            return res.status(200).json({
                success:true,
                count:orders.length,
                data:orders
            })
        }}
        if(req.user.role != 'admin')
            return next(new ErroeResponse('Not authorized to access this route',401));

    res.status(200).json(res.advancedResults);
})




// @desc    Delete Order
// @route   DELETE /api/v1/orders/:id
// @access  Private
exports.deleteOrder = asyncHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order)
        return next(new ErroeResponse(`No order with the id of ${req.params.id} found`));
    await order.remove();
    res.status(200).json({
        success:true,
        data:{}
    })
})



// @desc    Place Order
// @route   POST /api/v1/orders/:id
// @access  Private

exports.placeOrder = asyncHandler(async (req,res,next)=>{
    req.body.customer = req.user.id;
    const order = await Order.create(req.body);
    res.status(201).json({
        success:true,
        data:order
    })
})
