
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'


// gateway initiaize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// gateway variable
const  currency = 'usd'
const deliveryCharge = 10

// placing order by COD
const placeOrder = async (req, res) => {

    try {

         

        const {
            userId,
            items,
            amount,
            address
        } = req.body

        

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })

        res.json({
            success: true,
            message: "Order Placed"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}




// placing order using  Stripe Method

const  placeOrderStrip= async (req,res)=>{

    try {
        
         const {
            userId,
            items,
            amount,
            address
        } = req.body

        console.log( userId)

        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: true,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        const line_items = items.map((item) => ({
    price_data: {
        currency: currency.toLowerCase(),
        product_data: {
            name: item.name
        },
        unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
}));


 line_items.push({


    price_data: {
        currency: currency.toLowerCase(),
        product_data: {
            name: "Delivery charges"
        },
        unit_amount: Math.round(deliveryCharge * 100)
    },
    quantity: 1

    

 })
 const session = await stripe.checkout.sessions.create({
     success_url:`${origin}/verify?suceess=true&orderId=${newOrder._id}`,
     cancel_url : `${origin}/verify?suceess=false&orderId=${newOrder._id}`,
     line_items,
     mode:'payment'
 })
      res.json({success:true,session_url:session.url})
    } catch (error) {

        
        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}


//verfiy stripe 
const verifyStripe = async (req,res)=>{

    const {orderId ,success, userId}=req.body

    try {
        
        if(success === "true"){

            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{carrData:{}})

            req.json({success:true})
        }else{
             await orderModel.findByIdAndDelete(orderId)
              req.json({success:false})
        }

    } catch (error) {

         console.log(error)

        res.json({
            success: false,
            message: error.message})
        
    }
}




// placing order using razorpay


const  placeOrderRazorpay= async (req,res)=>{}



//  all order data for admin

const  allOrder= async (req,res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

        
    } catch (error) {

         console.log(error)

        res.json({
            success: false,
            message: error.message
        })
        
    }
}


// user order data for frontend 

const  userOrders= async (req,res)=>{

    try {
        
        const  {userId} = req.body
        const orders = await orderModel.find({userId})

        res.json({success:true ,orders})

    } catch (error) {

         console.log(error)

        res.json({
            success: false,
            message: error.message
        })
        
    }
}


//update status of order   for admin

const  updateStatuts= async (req,res)=>{

    try {
        
        const {orderId,status}= req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true ,message:"Status Updated"})

    }
        catch (error) {

         console.log(error)

        res.json({
            success: false,
            message: error.message
        })
        
    }
}



export {verifyStripe,placeOrder,placeOrderRazorpay,placeOrderStrip,allOrder,userOrders,updateStatuts}