const express = require('express');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// GET ALL
router.get('/', getProducts);

// GET SINGLE
router.get('/:id', getProduct);

// CREATE
router.post('/', createProduct);

// UPDATE
router.put('/:id', updateProduct);

// DELETE
router.delete('/:id', deleteProduct);

module.exports = router;