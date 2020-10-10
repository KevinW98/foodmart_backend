const express = require('express');
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/items');
const router = express.Router({mergeParams: true});
const Item = require('../models/Item');
const {protect,authorize}= require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
router.route('/')
    .get(advancedResults(Item, {path: 'category', select: 'name'}), getItems)
    .post(protect,authorize('admin'),addItem);
;
router.route('/:id')
    .get(getItem)
    .put(protect,authorize('admin'),updateItem)
    .delete(protect,authorize('admin'),deleteItem);

module.exports = router;