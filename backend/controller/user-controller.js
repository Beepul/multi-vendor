const express = require('express')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/mailer')
const UserModel = require('../model/userModel')
const LWPError = require('../utils/error')
const sendToken = require('../utils/jwtToken')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const userRouter = express.Router()

const createActivationToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: "5m"})
}

userRouter.post('/create', catchAsyncErrors(async (req,res,next) => {
    try {
        const {name,email,password} = req.body
    
        if(!name){
            return next(new LWPError('Name cannot be empty', 401))
        }
    
        if(!email){
            return next(new LWPError('Email cannot be empty', 401))
        }
    
        if(!password){
            return next(new LWPError('Password cannot be empty', 401))
        }
    
        // Email validation
        // Check if the email is valid or not
        // Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
        if(!email.match(emailRegex)){
            return next(new LWPError('Please enter valid email address', 401))
        }
    
        const allUsers = await UserModel.find({email})
    
        const isEmailExists = allUsers.length > 0
    
        if(isEmailExists){
            return next(new LWPError('User with the provided email already exists', 401))
        }
    
        const activationToken = createActivationToken({name,email,password})
    
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;
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
            message: 'User Activation link send'
        })
    } catch (error) {
        next(new LWPError(error,500))
    }
}))

userRouter.get('/activation/:token', catchAsyncErrors( async (req,res,next) => {
    try {
        const {token} = req.params

        console.log('From activation',token)
    
        const { name, email, password } = jwt.verify(token, process.env.JWT_SECRET);
    
        // Email validation
        // Check if the email is valid or not
        // Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
        if(!email.match(emailRegex)){
            return next(new LWPError('Email address is not valid', 401))
        }
    
        const allUsers = await UserModel.find({email})
    
        const isEmailExists = allUsers.length > 0
    
        if(isEmailExists){
            return next(new LWPError('User with the provided email already exists', 401))
        }
    
        const userCreated = await UserModel.create({ name, email, password });
    
        sendToken(userCreated, 201, res)
    } catch (error) {
        throw next(new LWPError(error, 500))
    }
}))

userRouter.post('/login', catchAsyncErrors(async (req,res,next) => {
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            return next(new LWPError('Email and password are required', 400))
        }

        const user = await UserModel.findOne({email}).select("+password")

        if(!user){
            return next(new LWPError('User with the provided email not found', 404))
        }

        const isPasswordMatched = await user.comparePassword(password)

        if(!isPasswordMatched){
            return next(new LWPError('The provided password doesnot match', 401))
        }

        sendToken(user, 200, res)

    } catch (error) {
        throw next(new LWPError(error,500))
    }
}))

module.exports = userRouter