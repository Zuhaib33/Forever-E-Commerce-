import { useState, useEffect } from 'react'

import axios from "axios"
import { backendUrl, currency } from '../App.jsx'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {

      return null
    }

    try {

      const responce = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (responce.data.success) {
        setOrders(responce.data.orders)
        console.log(responce.data.orders)
      } else {

        toast.error(responce.data.message)
      }

    } catch (error) {


      toast.error(error.message)
    }

  }

   const statusHandler = async (event,orderId)=>{

    try {
      
      const responce = await axios.post(backendUrl+"/api/order/status" , {orderId,status:event.target.value},{headers:{token}})
      if (responce.data.success) {
        await fetchAllOrders()
      } else {

        toast.error(responce.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
   }


  useEffect(() => {
    fetchAllOrders()
  }, [token])


  return (
    <div>

      <h3>Order Page</h3>

      <div>
        {
          orders.map((order, index) => (

            <div className=' lg:flex  justify-between sm:flex-row  md:flex border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text_sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />

              <div>


                <div>
                  {order.items.map((item, index) => {

                    if (index === order.items.length - 1) {

                      return <p className='py-0.5' key={index}> {item.name} X {item.quantity} <span>{item.size}</span> </p>

                    } else {

                      <p className='py-0.5' key={index}> {item.name} X {item.quantity} <span>{item.size}</span>, </p>

                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.fristName + " " + order.address.lastName}</p>

                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode + ","}</p>
                </div>
                {order.address.phone}
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'> Items : {order.items.length}</p>
                <p className='mt-3'> Method : {order.paymentMethod}</p>
                <p cla> Payment : {order.payment ? 'Done' : 'pending'}</p>
                <p> Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='h-8 p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>


          ))
        }
      </div>

    </div>
  )
}

export default Orders
