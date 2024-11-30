const express = require('express');
const {
    addProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
    upload
} = require('../controllers/productController')
const {checkAuth} = require('../middleware/auth')


const router = express.Router();

router.post('/', upload.single('image'), addProduct);
router.get('/' , getProducts)
router.get('/:id', getProductsById)
router.put('/:id' , upload.single('image'), updateProduct)
router.delete('/:id' ,deleteProduct )

module.exports = router