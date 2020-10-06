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

//Re-route into other resource routers
router.use('/:categoryId/items',itemRouter);

router.route('/')
    .get(advancedResults(Category, {path:'items',select:'name price'}),getCategories)
    .post(createCategory)

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;