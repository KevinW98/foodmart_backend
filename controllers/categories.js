const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc     Get all Categories of food
// @route    GET /api/v1/categories
// @access   Public

exports.getCategories = asyncHandler(async (req, res, next) => {


    res.status(200).json(res.advancedResults);
})


// @desc     Get a category by id
// @route    GET /api/v1/categories/:id
// @access   Public

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    res.status(200).json({success: true, data: category})
})


// @desc     Create a new category of food
// @route    POST /api/v1/categories
// @access   Private
exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({success: true, data: category});
})


// @desc     Update an existing category
// @route    PUT /api/v1/categories/:id
// @access   Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!category) return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    res.status(200).json({success: true, data: category})
})


// @desc    Delete a category by id
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    category.remove();
    res.status(200).json({success: true, data: {}})
})



