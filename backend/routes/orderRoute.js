import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import auth from "../middleware/auth.js"
import {placeOrder,placeOrderRazorpay,placeOrderStrip,allOrder,userOrders,updateStatuts} from '../controllers/orderController.js'

const orderRouter = express.Router();

//admin
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatuts)

// payment 
orderRouter.post('/place',auth,placeOrder)
orderRouter.post('/stripe',auth,placeOrderStrip)
orderRouter.post('/razorpay',auth,placeOrderRazorpay)

//user

orderRouter.post('/userOrders',auth,userOrders)


export default orderRouter


