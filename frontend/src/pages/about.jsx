
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../components/NewletterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-center pt-8 text-2xl border-t'>
         <Title text1={'About'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col sm:flex-row md:flex-row gap-6'>

        <img src={assets.about_img} className='w-full md:w-[450px]' />
         
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. 
          Enim laborum rem quam quae laudantium natus provident?</p>
          <p>adipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. 
          Enim laborum rem quam quae laudantium natus provident?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            dipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. 
          Enim laborum rem quam quae laudantium natus provident?
          </p>
      </div>
      </div> 
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm py-20 flex flex-col gap-5 hover:bg-black hover:text-white'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>dipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. </p>
        </div>
        <div className='border px-10 md:px-16 sm py-20 flex flex-col gap-5 hover:bg-black hover:text-white'>
          <b>Convenience:</b>
          <p className='text-gray-600'>dipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. </p>
        </div>
        <div className='border px-10 md:px-16 sm py-20 flex flex-col gap-5 hover:bg-black hover:text-white '>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600 '>dipisicing elit. Praesentium molestias mollitia, officiis, repudiandae at quidem nisi laboriosam harum, similique eos aut sed. </p>
        </div>
      </div>    
      <NewletterBox></NewletterBox> 
    </div>
    
  )
}

export default About
