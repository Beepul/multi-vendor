const express = require('express')
const userRouter = require('./user-controller')
const sellerRouter = require('./seller-controller')


const appRouter = express.Router()

appRouter.use('/user', userRouter)
appRouter.use('/seller', sellerRouter)



module.exports = appRouter