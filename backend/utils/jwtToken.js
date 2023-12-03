const sendToken = (user,statusCode,res,tokenName='token') => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3months
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }

    res.status(statusCode).cookie(tokenName,token,options).json({
        success: true,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        },
        token
    })
}

module.exports = sendToken