import React from 'react'
import { assets } from '../assets/assets'
import { useState, useEffect,useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {

  
  const [currentImage, setCurrentImage] = useState(0)
  const {visible} =useContext(ShopContext)
  console.log(visible)

  const images = [
    assets.hero_img,

    assets.hero_img2,
    assets.hero_img3,
    assets.hero_img4,
  ]

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)

  }, [])


  return (
    <div className={`relative border border-gray-400 ${visible? 'hidden':""}`} >
      {/* right hero */}
      <img
        key={currentImage}
        src={images[currentImage]}
        alt=""
        className='w-full lg:h-110 sm:h-40 object-cover '
      />
      {/* left side */}
      <div className='absolute inset-0 flex lg:px-25 md:px-10 sm:px-5  items-center justify-start text-white text-3xl font-bold" '>
        <div className='text-black '>
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



    </div>
  )
}

export default Hero
