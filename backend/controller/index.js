const express = require('express')
const userRouter = require('./user-controller')
const shopRouter = require('./shop-controller')
const productRouter = require('./product-controller')
const orderRouter = require('./order-controller')


const appRouter = express.Router()

appRouter.use('/user', userRouter)

appRouter.use('/shop', shopRouter)

appRouter.use('/product', productRouter)

appRouter.use('/order', orderRouter)



module.exports = appRouter