const express = require('express')
const appRouter = require('./controller')
const errorMiddleware = require('./middleware/error')
const LWPError = require('./utils/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const requestMiddleware = require('./middleware/requestMiddleware')

const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use(requestMiddleware)

app.use('/api/v1', appRouter)

app.get('/test', (req,res) => {
    throw new LWPError('Not Found',404)
})

app.use(errorMiddleware)

module.exports = app