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

    req.user = await UserModel.findById(decoded.id)

    next()
})

exports.isSeller = catchAsyncErrors(async (req,res,next) => {
    const {shop_token} = req.cookies

    if(!shop_token){
        return next(new LWPError('Please login to continue', 401))
    }

    const decoded = jwt.verify(shop_token, process.env.JWT_SECRET)

    req.seller = await ShopModel.findById(decoded.id)

    next()
})