const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Item = require('../models/Item');
const Category = require('../models/Category');

// @desc     Get Items
// @route    GET /api/v1/items
// @route    GET /api/v1/categories/:categoryId/items
// @access   Public
exports.getItems = asyncHandler(async (req, res, next) => {

    if (req.params.categoryId) {
        const items = await Item.find({category: req.params.categoryId});
        return res.status(200).json({
            success: true,
            count: items.length,
            data: items
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
});


// @desc    Get an item
// @route   GET /api/v1/items/:id
// @access  Public
exports.getItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate({
        path: 'category',
        select: 'name'
    });

    if (!item) return next(new ErrorResponse(`No Item with id of ${req.params.id}`, 404));
    res.status(200).json({
        success: true,
        data: item
    })
})


// @desc     Add an item
// @route    POST /api/v1/categories/:categoryId/items
// @access   Private

exports.addItem = asyncHandler(async (req, res, next) => {
    req.body.category = req.params.categoryId;
    const category = await Category.findById(req.params.categoryId);
    if (!category) return next(new ErrorResponse(`No Category with id ${req.params.categoryId} found`, 404));

    const item = await Item.create(req.body);

    res.status(200).json({
        success: true,
        data: item
    })

});


// @desc     Update an item
// @route    PUT /api/v1/items/:id
// @access   Private

exports.updateItem = asyncHandler(async (req, res, next) => {
    let item = await Item.findById(req.params.id);
    if (!item) return next(new ErrorResponse(`No item found with id of ${req.params.id}`, 404));

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: item
    })

});

// @desc   Delete an item
// @route  DELETE /api/v1/items/:id
// @access Private

exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    if (!item) return next(new ErrorResponse(`No item found with id of ${req.params.id}`, 404));

    await item.remove();
    res.status(200).json({
        success: true,
        data: {}
    })
})
