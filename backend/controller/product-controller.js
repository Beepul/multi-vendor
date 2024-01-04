const express = require('express')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const LWPError = require('../utils/error')
const ShopModel = require('../model/shopModel')
const Product = require('../model/productModel')
const { isSeller } = require('../middleware/auth')
const cloudinary = require('cloudinary')

const productRouter = express.Router()


productRouter.post('/create', isSeller , catchAsyncErrors(async (req,res,next) => {
    // res.send('Create product')

    try {
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
    
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
        }

        const productData = req.body;
        productData.shopId = req.shop._id;
        productData.images = imagesLinks;

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        })
        
    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))

productRouter.get('/:shopId', catchAsyncErrors(async (req,res,next) => {
    try {
        const {shopId} = req.params 
    
        const shop = await ShopModel.findById(shopId)
    
        if(!shop){
            return next(new LWPError(`shop with id ${shopId} doesnot exist`, 404))
        }
    
        const products = await Product.find({shopId: shop._id})
    
        if(products.length <= 0){
            return next(new LWPError('No prodcut has been created yet', 404))
        }
    
        res.status(200).json({
            success: true,
            message: 'Success',
            products
        })
    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))

productRouter.delete('/:id', isSeller , catchAsyncErrors(async (req,res,next) => {
    try {
        const {id} = req.params
    
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return next(new LWPError(`Product with id ${id} not found`,404))
        }

        for (let i = 0; 1 < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        res.status(200).json({
            success: true,
            message: `Product with id ${product._id} has been deleted successfully`,
        })
    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))

productRouter.get('/', catchAsyncErrors(async (req,res,next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })

        if(products.length <= 0){
            return next(new LWPError('No product has been created yet', 404))
        }

        res.status(200).json({
            success: true,
            message: 'success',
            products
        })
    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))


module.exports = productRouter