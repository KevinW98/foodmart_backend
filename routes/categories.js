const express = require('express');
const {
    getCategories,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory} = require('../controllers/categories');

const advancedResults = require('../middleware/advancedResults');
const Category = require('../models/Category');


//Include other resource router
const itemRouter = require('./items');
const router = express.Router();
const {protect,authorize}= require('../middleware/auth');

//Re-route into other resource routers
router.use('/:categoryId/items',itemRouter);

router.route('/')
    .get(advancedResults(Category, {path:'items',select:'name price'}),getCategories)
    .post(protect,authorize('admin'),createCategory)

router.route('/:id')
    .get(getCategory)
    .put(protect,authorize('admin'),updateCategory)
    .delete(protect,authorize('admin'),deleteCategory)

module.exports = router;