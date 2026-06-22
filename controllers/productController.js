const Product = require('../models/productModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

// GET ALL PRODUCTS
const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({});

  res.status(200).json(products);

});

// GET SINGLE PRODUCT
const getProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product);

});

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {

  const product = await Product.create(req.body);

  res.status(200).json(product);

});

// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );

  // FIXED HERE
  if (!updatedProduct) {
    res.status(404);
    throw new Error(`Cannot find product with ID ${id}`);
  }

  res.status(200).json(updatedProduct);

});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid Product ID'
    });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    res.status(404);
    throw new Error(`Cannot find product with ID ${id}`);
  }

  res.status(200).json({
    message: 'Product deleted successfully'
  });

});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};