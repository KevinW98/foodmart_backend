const express = require('express');
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/items');
const router = express.Router({mergeParams: true});
const Item = require('../models/Item');
const advancedResults = require('../middleware/advancedResults');
router.route('/')
    .get(advancedResults(Item, {path: 'category', select: 'name'}), getItems)
    .post(addItem);
;
router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem);

module.exports = router;