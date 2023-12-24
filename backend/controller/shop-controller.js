const express = require('express')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/mailer')
const LWPError = require('../utils/error')
const sendToken = require('../utils/jwtToken')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ShopModel = require('../model/shopModel')
const { isSeller } = require('../middleware/auth')
const hashPassword = require('../utils/hashPassword')

const shopRouter = express.Router()

const createActivationToken = (shopData) => {
    return jwt.sign(shopData, process.env.JWT_SECRET, {expiresIn: "5m"})
}

shopRouter.post('/create', catchAsyncErrors(async (req,res,next) => {
    try {
        const {name,phoneNumber, email, address, zipCode, password} = req.body
    
        if(!name){
            return next(new LWPError('Name cannot be empty', 401))
        }
    
        if(!email){
            return next(new LWPError('Email cannot be empty', 401))
        }
    
        if(!password){
            return next(new LWPError('Password cannot be empty', 401))
        }
        if(!phoneNumber){
            return next(new LWPError('phoneNumber cannot be empty', 401))
        }
        if(!address){
            return next(new LWPError('address cannot be empty', 401))
        }
        if(!zipCode){
            return next(new LWPError('zipCode cannot be empty', 401))
        }
    
        // Email validation
        // Check if the email is valid or not
        // Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
        if(!email.match(emailRegex)){
            return next(new LWPError('Please enter valid email address', 401))
        }
    
        const allShops = await ShopModel.find({email})
    
        const isEmailExists = allShops.length > 0
    
        if(isEmailExists){
            return next(new LWPError('Shop with the provided email already exists', 401))
        }

        const hashedPassword = await hashPassword(password)
    
        const activationToken = createActivationToken({name,phoneNumber, email, address, zipCode, password: hashedPassword})
    
        const activationUrl = `http://localhost:5173/shop/activation/${activationToken}`;
        await sendEmail({
            email: email,
            subject: "Please Activate Your Account",
            message: `
                <h2>Hello ${name}</h2>
                <p>To activate your account click the link below</p>
                <p>Link is only valid for 5 minutes</p>
                <a href=${activationUrl} clicktracking=off>${activationUrl}</a>
            `
    
        })
        res.status(200).json({
            success: true,
            message: 'Shop Activation link send'
        })
    } catch (error) {
        next(new LWPError(error,500))
    }
}))

shopRouter.get('/activation/:token', catchAsyncErrors( async (req,res,next) => {
    try {
        const {token} = req.params
    
    
        const {name,phoneNumber, email, address, zipCode, password} = jwt.verify(token, process.env.JWT_SECRET);
    
        // Email validation
        // Check if the email is valid or not
        // Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
        if(!email.match(emailRegex)){
            return next(new LWPError('Email address is not valid', 401))
        }
    
        const allShops = await ShopModel.find({email})
    
        const isEmailExists = allShops.length > 0
    
        if(isEmailExists){
            return next(new LWPError('Shop with the provided email already exists', 401))
        }
    
        const shopCreated = await ShopModel.create({name,phoneNumber, email, address, zipCode, password});
        
    
        sendToken(shopCreated, 201, res,'shop_token')
    } catch (error) {
        throw next(new LWPError(error, 500))
    }
}))

shopRouter.post('/login', catchAsyncErrors(async (req,res,next) => {
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            return next(new LWPError('Email and password are required', 400))
        }

        const shop = await ShopModel.findOne({email}).select("+password")

        if(!shop){
            return next(new LWPError('Shop with the provided email not found', 404))
        }

        const isPasswordMatched = await shop.comparePassword(password)

        if(!isPasswordMatched){
            return next(new LWPError('The provided password doesnot match', 401))
        }

        sendToken(shop, 200, res,'shop_token')
        
    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))

shopRouter.get(
    "/",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        // console.log("shop:: ",req.shop)
      try {

        const shop = await ShopModel.findById(req.shop._id);
  
        if (!shop) {
          return next(new LWPError("Shop doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          shop,
        });
      } catch (error) {
        return next(new LWPError(error.message, 500));
      }
    })
);

module.exports = shopRouter