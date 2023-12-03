const express = require('express')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const LWPError = require('../utils/error')
const ShopModel = require('../model/shopModel')
const Product = require('../model/productModel')
const { isSeller } = require('../middleware/auth')

const productRouter = express.Router()


productRouter.post('/create', isSeller , catchAsyncErrors(async (req,res,next) => {
    // res.send('Create product')

    try {
        const {name,description,category,tags,originalPrice,discountPrice,stock,shopId} = req.body 

        if(!name || !description || !category || !originalPrice || !discountPrice || !stock || !shopId){
            return next(new LWPError('All feilds required',401))
        }

        const shop = await ShopModel.findById(shopId)

        if(!shop){
            return next(new LWPError(`Shop with id ${shopId} not found`, 404))
        }

        const product = {
            name,
            description,
            category,
            originalPrice,
            discountPrice,
            stock,
            shopId: shop._id 
        } 

        if(tags){
            product.tags = tags
        }

        const newProduct = await Product.create(product)

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
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
        const products = await Product.find()

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