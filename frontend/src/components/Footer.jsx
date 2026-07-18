import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 '>
        <div>
            <img src={assets.logo}alt=""  className='mb-5 w-32'/>
            <p className='w-full md:w-1/2 text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Tenetur facilis eius deleniti, alias quisquam totam molestias repellendus nemo ut voluptatum non quam nam aliquam sapiente itaque quas velit ea nobis</p>
        </div>
        <div>
          <p className='text-lx font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className='text-lx font-medium mb-5'>GET IN TECH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+92300000000</li>
            <li>randaom@gmail.com</li>
          </ul>
        </div>
        
      </div>
      <div className='text-gray-800'>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2026@ forever.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
