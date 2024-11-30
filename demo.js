const Product = require('./backend/models/product')

async function addProduct(req , res){
      try {
        const {name , price , description} = req.body;
        if(!req.file){
            return res.status(400).json({message : "Please upload a product image"})
        } 
        const imageUrl = req.file.path
        const product = await Product.create({
            name : name, 
            price : price,
            description : description,
            imageUrl : imageUrl
        })
        res.status(200).json({ message: 'Product added successfully',
            product,
        });
      } catch (error) {
         res.status(500).json({ message: 'Failed to add product' });
      } 
 }

 async function getProducts(req , res){
    try {
        const product = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', product})
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product' });

    }
 }

 async function deleteProduct(req , res ) {
    try {
        const product = await Product.findOneAndDelete(req.prams.id)
    } catch (error) {
         
    }
 }