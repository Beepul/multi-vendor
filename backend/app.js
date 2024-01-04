const express = require('express')
const appRouter = require('./controller')
const errorMiddleware = require('./middleware/error')
const LWPError = require('./utils/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require("./middleware/morgan");

const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', appRouter)

app.get('/test', (req,res) => {
    res.send('Multi vendor working')
})



app.use(errorMiddleware)

module.exports = app