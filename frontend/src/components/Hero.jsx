import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* right hero */}
        <div className='w-full sm:w-1/2 flex items-center justify-center sm:py-0 py-10 '>
             <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Lasest Arrivail</h1>
                <div className='flex items-center gap-2'>
                    <p>SHOP NN</p>
                    <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                </div>
             </div>
        </div>
        {/* left side */}
        <img src={assets.hero_img} alt=""  className='w-full sm:w-1/2 '/>
      
    </div>
  )
}

export default Hero
