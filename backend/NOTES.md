#   Things I have learned during Multi-Vendor project

##   Error Handler

###  Custom Error Class 
-   Create new error class that extends Error class of node js 
-   Add constructor that accepts message and status code 
-   Call the constructor of the parent class (Error) using super method and pass message to it 
-   Add a statusCode property to the custom error class
-   Capture the stack trace for better error debugging
```js 
    class LWPError extends Error {
        constructor(message,statusCode){
            super(message)
            this.statusCode = statusCode

            Error.captureStackTrace(this, this.constructor)
        }
    }

    module.exports = LWPError
```

###  Custom Error Middleware 
-   set error.statusCode to custom statusCode or 500
-   set error.message to custom message or 'Internal Server Error'
-   send response with error.statusCode and message with error.message
```js 
    module.exports = (err,req,res,next) => {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal server Error"

        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
```

### Use of Custom Error Handler 
```js 
    // app.js 

    app.use(errorMiddleware)
```
```js 
    const error = new LWPError("Custom error message", 404);
    next(error);

    // -----------------  OR -------------------------

    return next(new LWPError('No product has been created yet',404))

    // ---------------- OR -----------------------

    throw next(new LWPError(error,500))
```

##  Error Handling for Async Functions 
```js 
    const asyncHandler = (theFunc) => (req,res,next) => {
        Promise.resolve(theFunc(req,res, next)).catch(next)
    }
    module.exports = asyncHandler
```
-   Here, asyncHandler is a higher order function that takes another function (theFunc) as its parameter. This higher-order function returns a new middleware function.
-   theFunc is any function that is wrapperd with asyncHandler
```js 
    router.post('/create', asyncHandler( async (req,res) =>{}))
```
-   Here, theFunc is "async (req,res) =>{}"
-   Now we wrap theFunc by Promise.resolve which will resolve any promises that where not handled inside the logic and we pass the req,res,next inside theFunc
-   Moving on, the catch is chained with Promise, When an error is caught, it passes the error to the next middleware in the stack by invoking next(error). This ensures that the error is propagated down the middleware chain to the error-handling middleware.

##  Node Mailer 

-   Node mailer is simply used to send mails from the backend 
-   To use node mailer we need to install node mail using 
```js 
    npm install nodemailer 
```
```js 
    yarn add nodemailer     
```
-   Import node mailer
```js 
    const nodeMailer = require('nodemailer')
```
-   We need to create a transporter in order to send mail
-   Node mailer has a function called createTransport to create a transporter and it takes options in the argument 
```js 

    const transporterOptions = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    }

    const transporter = nodeMailer.createTransport(transporterOptions)
``` 
-   Now to send email, we can use function called sendMail which is inside transporter
-   sendEmail takes options as an argument and gives callback function 
```js 
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: 'someone@gmail.com',
        subject: 'This is node mailer note',
        html: 'Some message here',
    }

    transporter.sendMail(mailOptions, function(error, res){
        if(error){
            throw new LWPError('Failed to send Email', 400)
        }else{
            res.send("Email has been sent successfully");
        }
    })
```
-   Proper way to use node mailer is by creating a function that takes options for the sendMail function and firing this function went we need it 
```js 
    const sendEmail = (options) => {

        const transporterOptions = {...}

        const transporter = nodeMailer.createTransport(transporterOptions)

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            html: options.message,
        }

        transporter.sendMail(mailOptions, function(error, res){...})
    }
    module.exports = sendEmail
```

##  Mongoose and MongoDB 

###  Mongo DB connection 

```js 
    const mongoose = require('mongoose');

    const connectDatabase = async () => {
    	try {
    		const data = await mongoose.connect(process.env.DB_URL);
    		console.log(`mongodb connected with server: ${data.connection.host}`);
    	} catch (error) {
    		console.log(error);
    	}
    };

    module.exports = { connectDatabase };

```

###  Some Knowledge about mongoose schema

####    Mongoose Middleware 

-   Mongoose provides some middleware that can be very useful 
-   Middleware of mongoose are like event handlers in normal js
-   Middleware takes an event of string type as and argument and a callback function which comes with next
-   Middleware functions are executed one after another, when each middleware calls next.
-   We can use middleware like: schema.pre()
-   For now lets look a the pre middleware that takes and event i.e 'save' (meaning execute this middleware before saving the document in db) and callback function

```js 
    const userSchema = new mongoose.Schema({...})

    userSchema.pre('save', async function(next){
      if(!this.isModified('password')){
        next()
      }
      this.password = await bcrypt.hash(this.password, 10)
    })
``` 

-   Here we have used pre to encrypt the password before saving in db 
-   We are checking if the password in current doc has been modified or not, if it is not modified just skip whole procedure by calling next 
-   If the password feild of the current doc has been modified than only hash the new password and save in db 

####    Mongoose Custom Methods

-   Mongoose gives us ability to make our custom methods in each document 
-   Custom method and attached to each document 
-   Lets look at how document looks after we make custom methods
```js 
    const user = await User.find()
    console.log(user) 
```
```js 
    user = [
        {
            ...restUserData,
            customMethod: [Function]
        },
        {
            ...restUserData,
            customMethod: [Function]
        }
    ]
```
-   Lets Create a custom method for geting jwt token 
```js 
    shopSchema.methods.getJwtToken = function(){
        return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })
    }
```
-   Lets see how we can use this custom method
```js 
    const user = await User.findById(id)

    const token = user.getJwtToken()
```

   

For Quick Mark Down Guides. [click me](https://www.markdownguide.org/basic-syntax/#:~:text=Ordered%20Lists,start%20with%20the%20number%20one.)

