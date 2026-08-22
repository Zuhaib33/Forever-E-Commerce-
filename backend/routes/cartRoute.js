import express from 'express'
import  {addToCart,updateCart,getUserCart}  from '../controllers/CartController.js'
import authUser from '../middleware/auth.js'


const cartRuter = express.Router()


cartRuter.post("/get", authUser, getUserCart)
cartRuter.post("/add", authUser, addToCart)
cartRuter.post("/update", authUser, updateCart)


export default cartRuter 