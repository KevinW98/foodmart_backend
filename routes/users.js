const express = require('express');
const {getUsers, getUser, createUser,updateUser, deleteUser} = require('../controllers/users');
const User = require('../models/User');
const router = express.Router({mergeParams: true});
const advancedResults = require('../middleware/advancedResults');
const {protect,authorize}= require('../middleware/auth');



// router.use(protect);
// router.use(authorize('admin'));

//Include other resource routers
const orderRouter = require('./orders');

//Re-route into other resource router
router.use('/:orderId/orders',protect,authorize('admin','customer'),orderRouter);


router
     .route('/')
    .get(protect,authorize('admin'),advancedResults(User),getUsers)
    .post(protect,authorize('admin'),createUser);

router
    .route('/:id')
    .get(protect,authorize('admin'),getUser)
    .put(protect,authorize('admin'),updateUser)
    .delete(protect,authorize('admin'),deleteUser);

module.exports= router;
