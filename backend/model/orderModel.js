const mongoose = require("mongoose");

const cartSchema = {
  shopId: {
    type: mongoose.Types.ObjectId,
    ref: 'Shop',
    required: true 
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  }
}

const orderSchema = new mongoose.Schema({
  cart: [cartSchema],
  shippingAddress: {
    type: Object,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order