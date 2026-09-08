import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Verify() {

  const { navigate, token, setCartItems } = useContext(ShopContext)


  const { searchParams, setSearchParams } = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('success')

  const verifyPayment = async () => {

    try {

      if (!token) {
        return null
      }

      const responce = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })

      if (responce.data.success) {
        setCartItems({})
        navigate('/orders')

      } else {
        navigate('/cart')
      }

    } catch (error) {


      console.log(error)
      toast.error(error.message)

    }

  }

     useEffect(()=>{

      verifyPayment()

    } 
    ,[token])


  return (
    <div>

    </div>
  )
}
