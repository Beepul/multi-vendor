const express = require('express')
const appRouter = require('./controller')

const app = express()


app.use('/api/v1', appRouter)

module.exports = app