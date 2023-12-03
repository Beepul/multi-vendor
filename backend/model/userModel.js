const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

UserSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}


const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel