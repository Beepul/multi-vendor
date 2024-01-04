const express = require('express')
const loadEnv = require("dotenv");
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Stripe = require('stripe')

loadEnv.config({
  path: "config/.env",
});

const paymentRouter = express.Router()

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post(
    "/process",
    catchAsyncErrors(async (req, res, next) => {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
          company: "LearnWithPratap",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    })
  );

paymentRouter.get('/stripe-api-key', catchAsyncErrors((req, res, next) => {
    res.status(200).json({stripeApiKey: process.env.STRIPE_PK_KEY})
}))

module.exports = {paymentRouter}