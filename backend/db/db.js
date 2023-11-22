const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL)
        console.log(`mongodb connected with server: ${data.connection.host}`)
    } catch (error) {
        console.log(error)
    }
    // mongoose.connect(process.env.DB_URL,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true 
    // })
    // .then((data) => {
    //     console.log(`mongodb connected with server: ${data.connection.host}`)
    // })
}

module.exports = {connectDatabase}