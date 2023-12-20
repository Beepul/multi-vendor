const requestMiddleware = (req,res,next) => {
    console.log(`
        PATH::${req.path} 
        METHOD:: ${req.method}
        `)
    next();
}

module.exports = requestMiddleware