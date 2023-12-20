const jwt = require('jsonwebtoken')
const LWPError = require("../utils/error");
const catchAsyncErrors = require("./catchAsyncErrors");
const UserModel = require('../model/userModel');
const ShopModel = require('../model/shopModel');


exports.isAuthenticated = catchAsyncErrors(async (req,res,next) => {
    try {
        const {token} = req.cookies 
    
        if(!token){
            return next(new LWPError('User Please login to continue', 401))
        }
    
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await UserModel.findById(decoded.id)
    
        if(!user){
            res.clearCookie('token')
            return next(new LWPError('You are not authorized to access this resources', 401))
        }
    
        req.user = user
    
        next()
        
    } catch (error) {
        res.clearCookie('token')
        return next(new LWPError('Invalid token! You are not authorized to access this resources', 403))
    }
})

exports.isSeller = catchAsyncErrors(async (req,res,next) => {
    try {
        const {shop_token} = req.cookies

        console.log(req.cookies)
    
        if(!shop_token){
            return next(new LWPError('Shop Please login to continue', 401))
        }
    
        const decoded = jwt.verify(shop_token, process.env.JWT_SECRET)
    
        
        const shop = await ShopModel.findById(decoded.id)
        
        if(!shop){
            res.clearCookie('shop_token')
            return next(new LWPError('Only shops are access this resources', 401))
        }
    
        req.shop = shop
        
        next()
        
    } catch (error) {
        res.clearCookie('shop_token')
        return next(new LWPError('Only shops are access this resources', 401))
    }
})