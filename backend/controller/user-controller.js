const express = require('express')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/mailer')
const userModel = require('../model/userModel')

const userRouter = express.Router()

userRouter.post('/create', (req,res) => {
    const {name,email,password} = req.body

    const activationToken = createActivationToken({name,email,password})

    const activationUrl = `http://localhost:8080/api/v1/user/activation?token=${activationToken}`;
    sendEmail({
        email: email,
        subject: "Please Activate Your Account",
        message: `
        <h2>Hello ${name}</h2>
        <p>Please use the url bellow to activate your account</p>
        <p>To activate your account click the link below</p>
        <a href=${activationUrl} clicktracking=off>${activationUrl}</a>`

    })
    res.status(200).json({
        success: true,
        message: 'User Activation link send'
    })
})

const createActivationToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: "5m"})
}

userRouter.get('/activation', async (req,res) => {
    const {token} = req.query

    console.log('Token ::', token)

    const { name, email, password } = jwt.verify(token, process.env.JWT_SECRET);

    const userCreated = await userModel.create({ name, email, password });
    
    console.log("User Created :: ", userCreated);

    res.status(200).send("User Activated");
})

module.exports = userRouter