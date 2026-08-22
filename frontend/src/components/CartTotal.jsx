import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    let{currency,delivery_fee,getCardAmount,itemCard}=useContext(ShopContext)

    useEffect(()=>{
      getCardAmount()
    },[itemCard])
  return (
    <div className='w-full'>
      <div className='ttext-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gsp-2 mt-2 tett-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getCardAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{getCardAmount()==0?0 : getCardAmount()+delivery_fee}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
