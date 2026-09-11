import React from 'react'
import { assets } from '../assets/assets'

const DisCount = () => {
  return (
    <div className=''>
      <h1 className='text-3xl font-md w-full text-center tracking-wide py-5 font-medium sm:py-3 text-gray-600'>OUR <span className='text-gray-800'>CATEGORIES</span> </h1>
      <p className='  pb-3 text-lg w-full text-center text-gray-500'>Explore a wide range of styles, handpicked to suit every taste and need.</p>
      <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:pt-10 sm:pt-5 py-10 px-10'>
        <div className=' relative h-fit py-5'>
            <img src={assets.dis1} alt="" className='h-80 lg:w-[95%]  w-full border-black border-3 rounded-2xl   ' />
            <h1 className='bg-white text-black text-center py-5 w-[70%] text-xl font-semibold absolute  items-center h-20 rounded-2xl lg:bottom-[-40px] bottom-0.5 border left-[15%] border-gray-500 border'>Womens Wear</h1>
        </div>
        <div className=' relative h-fit pt-10'>
            <img src={assets.dis2} alt=""  className='h-80 w-full lg:w-[100%] border-black border-3 rounded-2xl '/>
            <h1 className='bg-white text-black text-center py-5 w-[70%] text-xl font-semibold absolute  items-center h-20 rounded-2xl lg:bottom-[-40px] bottom-0.5 left-[15%] border border-gray-500'>Mens Wear</h1>
        </div>
      </div>

      <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:pt-10 sm:pt-5  px-10'>
        <div className=' relative h-fit py-5'>
            <img src={assets.dis3} alt="" className='h-80 lg:w-[95%]  w-full border-black border-3 rounded-2xl   ' />
            <h1 className='bg-white text-black text-center py-5 w-[70%] text-xl font-semibold absolute  items-center h-20 rounded-2xl lg:bottom-[-40px] bottom-0.5 border left-[15%] border-gray-500 border'>Kids Wear</h1>
        </div>
        <div className=' relative h-fit py-10'>
            <img src={assets.dis5} alt=""  className='h-80 w-full lg:w-[100%] border-black border-3 rounded-2xl '/>
            <h1 className='bg-white text-black text-center py-5 w-[70%] text-xl font-semibold absolute  items-center h-20 rounded-2xl lg:bottom-[-0px] bottom-0.5 left-[15%] border border-gray-500'>Older People Wear</h1>
        </div>
      </div>
      
    </div>
  )
}

export default DisCount
