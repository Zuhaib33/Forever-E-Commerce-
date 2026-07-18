import React, { useContext } from 'react'
import { products } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Order = () => {
 const {products,currency}=useContext(ShopContext)
 
  return (
    <div className='border-t pt-10'>
      <div className='text-2xl '>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          products.slice(1,4).map((item,index)=>(
            
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row md:items-center justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity:1</p>
                    <p>Size:M</p>
                  </div>
                  <p className='mt-2'>Date <span className='text-gray-500'>25,july 2026</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                   <p className='txet-sm md:text-base'>Ready to ship</p>
                </div>
                <button className='border border-gray-600 px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
