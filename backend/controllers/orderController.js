// import orderModel from '../models/orderModel.js'
// import userModel from '../models/userModel.js'
// // placing order using  cod


// const  placeOrder= async (req,res)=>{

//     try {
        
//         const {userId,items,amount,address,} = req.body

//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod:"COD",
//             payment:false,
//             date : Date.now()
//         }

//         const newOrder = new orderModel(orderData)

//         await newOrder.save()

//         await userModel.findByIdAndUpdate(userId,{cartData:{}})

//         res.json({success:true, message:"Order Place"})


//     } catch (error) {

//         console.log(error)
//         res.json({success:false, message:error,message})
        
//     }
// }


import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

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

const  placeOrderStrip= async (req,res)=>{}




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

const  updateStatuts= async (req,res)=>{}



export {placeOrder,placeOrderRazorpay,placeOrderStrip,allOrder,userOrders,updateStatuts}