const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address!"], 
  },
  zipCode: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "seller"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

shopSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

shopSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}


const ShopModel = mongoose.model("Shop", shopSchema);

module.exports = ShopModel