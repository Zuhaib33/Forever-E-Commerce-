import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price,index}) => {
    const {currency}=useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer  '>
         <div className='overflow-hidden   '>
            <img src={image[0]}  className={`hover:scale-120 rounded-2xl  ease-in-out ${index%2===0?'mt-7':''} `}  alt="" />

         </div>
         <p className='pt-3 pb-1 text-sm'>{name}</p>
         <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
