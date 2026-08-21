import express from 'express'
import  {addToCart,updateCart,getUserCart}  from '../controllers/CartController'


const cartRuter = express.Router()


cartRuter.post("/get",getUserCart)
cartRuter.post("/get",addToCart)
cartRuter.post("/get",updateCart)


export default cartRuter 