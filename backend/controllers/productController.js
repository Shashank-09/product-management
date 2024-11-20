const Product = require('../models/product');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');
const multer = require('multer');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'products',
      allowed_formats: ['jpg', 'jpeg', 'png' , 'webp'], 
    },
  });
const upload = multer({ storage });



async function addProduct(req, res) {
    try {
      const { name, price, description } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
      const imageUrl = req.file.path;
      const product = await Product.create({
        name,
        price,
        description,
        imageUrl,
      });
  
      res.status(200).json({
        message: 'Product added successfully',
        product,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error adding product',
        error: error.message,
      });
    }
  }


async function getProducts(req, res){
    try {
    const prosuct =  await Product.find()
    res.json(prosuct)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message, 
        }); 
    }
}

async function getProductsById(req , res){
    try {
     const product = await Product.findById(req.params.id)
     if(!product) return res.status(404).json({ message: 'Product not found' });
     res.json(product)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message, 
        }); 
    }
}

async function updateProduct(req, res) {
    try {
      const { name, price, description } = req.body;
      let imageUrl = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;  
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, description, imageUrl: imageUrl || undefined }, 
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
  
    } catch (error) {
      res.status(400).json({
        message: "Error updating product",
        error: error.message,
      });
    }
  }


async function deleteProduct(req, res) {
    try {
        console.log('Received product ID:', req.params.id);
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message,
        });
    }
}

module.exports = { 
    addProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
    upload
};
