import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js"
import {placeOrder,placeOrderRazorpay,placeOrderStrip,allOrder,userOrders,updateStatuts,verifyStripe} from '../controllers/orderController.js'


const orderRouter = express.Router();

//admin
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatuts)

// payment 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user

orderRouter.post('/userOrders',authUser,userOrders)

// verfiy payment

orderRouter.post('verifyStripe',authUser,verifyStripe)


export default orderRouter


