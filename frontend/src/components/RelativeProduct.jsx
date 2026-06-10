import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const relativeProduct = ({cetagory,subCetagory}) => {
    const {products}=useContext(ShopContext)
    const [relativePdts,setRelative]=useState([])
     
    const relativePdt=()=>{
       let productsCopy=products.slice()
        productsCopy=productsCopy.filter((item)=>item.category==cetagory)
        productsCopy=productsCopy.filter((item)=>item.subCategory==subCetagory)
        setRelative(productsCopy.slice(1,5))
       

    }
    useEffect(()=>{relativePdt()},[cetagory,subCetagory])

  return (
    <div className='mt-20'>
        <div className='text-3xl my-5 '>
            <Title text1={'RELATIVE'} text2={"PRODUCTS"}/>
       </div>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
             
        {
                relativePdts.map((item, index) => (
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

export default relativeProduct
