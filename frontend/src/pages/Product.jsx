
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelativeProduct from '../components/RelativeProduct'

const Product = () => {
  const [image, setImage] = useState(null)
  const [productData, setProductData] = useState(null)
  const [size,setSize]=useState('')

  const { productId } = useParams()
  const { products,currency,addtoCard } = useContext(ShopContext)

  useEffect(() => {
    const found = products.find((item) => item._id === productId)

    if (found) {
      setProductData(found)
      setImage(found.image[0])
      console.log(found)
    }
  }, [products, productId])

  if (!productData) {
    return <div>Loading...</div>
  }

  return (
    <>

    <div className='flex my-5 flex-col sm:flex-row'>


      <div className='flex flex-col-reverse  sm:flex-row lg:w-full '>
         <div className='flex flex-row gap-2 sm:flex-col w-[25%] '>
        {productData.image.map((item, index) => (
          <img key={index} src={item} alt="" className='w-[90%] h-26   object-cover  cursor-pointer hover:scale-105 transition ' onClick={()=>setImage(item)}/>
        ))}
      </div>

       <div className='largeImage  flex-1 '>
        <img src={image} alt="" className='w-full h-[450px]  md:w-[800px] object-cover rounded-md ' />
      </div>

      </div>
     

       {/* product infotmation */}
      <div className='ImageInformation flex flex-col lg:mx-7'>
        <h1 className='text-2xl font-medium'>{productData.name}</h1>
        <span>
          <div className='flex flex-row gap-0.5 my-3'>
          <img src={assets.star_icon} alt="" className='w-4' />
          <img src={assets.star_icon} alt="" className='w-4' />
          <img src={assets.star_icon} alt="" className='w-4' />
          <img src={assets.star_icon} alt="" className='w-4' />
          <img src={assets.star_dull_icon} alt="" className='w-4' />
          
        </div><p className='text-xl mx-2'>(122)</p>
        </span>
        <p className='text-2xl font-medium my-2'>{currency}{productData.price}</p>
        <p className='text-gray-500 text-sm'>{productData.description}</p>
        <p className='mt-3'>Select Size</p>
        <div className='flex mt-1 gap-4'>
          {
            productData.sizes.map((item,index)=>
              <button key={index} onClick={()=>setSize(item)} className={`bg-[#4e37d30e] text-center w-8 h-8 mt-1.5  ${size === item ? 'border border-black':''}`}>{item}</button>
            )
          }
          
        </div>
        <button onClick={()=>addtoCard(productData._id,size)} className='bg-black text-white  w-fit active:text-orange-100 my-4 text-center py-1 px-4 text-md font-light'>ADD TO CARD</button>
        <hr className=' opacity-5 mt-2'/>
        <p className='text-gray-500 text-sm font-light mt-5'>100% Original Product</p>
        <p className='text-gray-500 text-sm font-light'>Cash on delivery is available on this product</p>
        <p className='text-gray-500 text-sm font-light'>Easy return and exchange policy within 7 days</p>
      </div>
</div>




  {/* description and relative  */}
       <div className='mt-20'>
        <div className='flex'>
          <button className='border px-5 py-3 text-sm border-gray-300 font-semibold'>Description</button>
          <button className='border px-5 py-3 text-sm border-gray-300'>Relative (122)</button>
        </div>
        <div className='flex flex-col gap-4 border border-gray-300 p-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis temporibus
             repellendus, autem quo corrupti delectus aut deleniti. Quo numquam, repudiandae, error quod ea 
             veniam laborum, non maxime molestiae nostrum possimus!</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis temporibus
             repellendus, autem quo corrupti delectus aut deleniti repellendus, autem quo corrupti 
             delectus aut deleniti</p>
        </div>
       </div>
       
       {/* Relative products */}
       <RelativeProduct cetagory={productData.category} subCetagory={productData.subCategory}/>
       
       </>
  )
}

export default Product