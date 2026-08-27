import React, { use, useContext, useEffect, useState } from 'react'
import { products } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Order = () => {
 const {backendUrl,currency,token}=useContext(ShopContext)

 const [orderData,setOrderData] = useState([])

 const loadOrderData = async ()=>{
          
      try {
           
        if(!token){
          return null
        }else{

          const responce = await axios.post(backendUrl+"/api/order/userOrders",{},{headers:{token}})
          if(responce.data.success){
            let allOrder = []
            responce.data.orders.map((order)=>{
              order.items.map((item)=>{
                item['status']=order.status
                item['payment']=order.payment
                item['paymentMethod']=order.paymentMethod
                item['date']=order.date
                allOrder.push(item)
              })
            })
            setOrderData(allOrder.reverse())
          }
        }
        
     } catch (error) {

      console.log(error)
    
     }
 }

   useEffect(()=>{

         loadOrderData()
   },[token])
 
  return (
    <div className='border-t pt-10'>
      <div className='text-2xl '>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          orderData.map((item,index)=>(
            
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row md:items-center justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                   <p className='txet-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border border-gray-600 px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
