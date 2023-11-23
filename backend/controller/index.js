const express = require('express')
const userRouter = require('./user-controller')


const appRouter = express.Router()

appRouter.use('/user', userRouter)


module.exports = appRouter