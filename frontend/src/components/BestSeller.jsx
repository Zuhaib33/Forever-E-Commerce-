import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products} =useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])
    useEffect(()=>{
        const bestpdt=products.filter((item)=>(item.bestseller));
        setBestSeller(bestpdt.slice(0,5))
    },[products])
   return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"BEST"} text2={"SELLER"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, adipisci. Soluta sunt perferendis a fugit animi non sequi dolor architecto laboriosam.</p>
        </div>
        
        {/* cards */}
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-4 '>
             {
                bestSeller.map((item, index) => (
    <ProductItem 
        key={index}
        id={item._id}
        image={item.image}
        name={item.name}
        price={item.price}
    />
))
             }
        </div>
    </div>
  )
}

export default BestSeller
