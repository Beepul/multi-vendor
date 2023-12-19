const jwt = require('jsonwebtoken')
const LWPError = require("../utils/error");
const catchAsyncErrors = require("./catchAsyncErrors");
const UserModel = require('../model/userModel');
const ShopModel = require('../model/shopModel');


exports.isAuthenticated = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies 

    if(!token){
        return next(new LWPError('Please login to continue', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded.id)

    const user = await UserModel.findById(decoded.id)

    if(!user){
        return next(new LWPError('You are not authorized to access this resources', 401))
    }

    req.user = user

    next()
})

exports.isSeller = catchAsyncErrors(async (req,res,next) => {
    const {shop_token} = req.cookies

    if(!shop_token){
        return next(new LWPError('Please login to continue', 401))
    }

    const decoded = jwt.verify(shop_token, process.env.JWT_SECRET)

    
    const shop = await ShopModel.findById(decoded.id)
    
    if(!shop){
        return next(new LWPError('Only shops are access this resources', 401))
    }

    req.shop = shop
    
    next()
})