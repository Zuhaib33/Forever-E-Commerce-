import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const Placeorder = () => {


  const [method,setMethod]=useState('cod')
  const {navigate,backendUrl,token,itemCard,setItemcard,getCardAmount,delivery_fee,products}=useContext(ShopContext)

  const [fromData , setFromData] = useState({
    fristName:'',
    lastName:'',
    email:'',
    city:'',
    state:'',
    street:'',
    zipcode:'',
    country:'',
    phone:'',
    })

    const onChangeHandler = (event)=>{
      const name =event.target.name
      const value = event.target.value

      setFromData(data=> ({...data,[name]:value}))
    }



  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
   
    try {
        let orderItems = []

        for (const items in itemCard) {

            for (const item in itemCard[items]) {

                if (itemCard[items][item] > 0) {

                    const itemInfo = products.find(
                        product => product._id === items
                    )

                    if (itemInfo) {

                        orderItems.push({
                            ...itemInfo,
                            size: item,
                            quantity: itemCard[items][item]
                        })
                    }
                }
            }
        }

        let orderData = {
            address: fromData,
            items: orderItems,
            amount: getCardAmount() + delivery_fee
            
        }
         
        switch (method) {
          
            case 'cod':
             
                const response = await axios.post(
                    backendUrl + '/api/order/place',
                    orderData,
                    {
                        headers: { token }
                    }
                )

                console.log(response.data)

                if (response.data.success) {

                    setItemcard({})
                    navigate('/orders')

                } else {

                    toast.error(response.data.message)
                }

                break

            default:
                break
        }

    } catch (error) {

        console.log(error)

        toast.error(
             error.message
        )
    }
}



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler } name='fristName' value={fromData.fristName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Frist name' />
            <input required onChange={onChangeHandler } name='lastName' value={fromData.lastName}  type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler } name='email' value={fromData.email} type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
          <input required onChange={onChangeHandler } name='street' value={fromData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler } name='city' value={fromData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
            <input required onChange={onChangeHandler } name='state' value={fromData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler } name='zipcode' value={fromData.zipcode} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
            <input required onChange={onChangeHandler } name='phone' value={fromData.phone} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Contry' />
          </div>
          <input required onChange={onChangeHandler } name='country' value={fromData.country} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' />

      </div>
      {/* right side */}
      <div className='mt-8 '>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>

            {/* payments methods */}

            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={()=>setMethod('stripe')}>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''} `}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={()=>setMethod('razorpay')}>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':''} `}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={()=>setMethod('cod')}>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              
            </div>

          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white  px-16 py-3 text-sm '>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
