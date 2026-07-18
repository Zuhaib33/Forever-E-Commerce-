import React, { useState } from 'react'

const Login = () => {

  const [currentState,setCountState]=useState('Sign Up')
  const onSubmitHandlder=(event)=>{
  event.preventDefault()
 }
  return (
    <form onClick={()=>onSubmitHandlder} className='flex flex-col items-center w-[90%]  sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none w-8 h-[1.5px] bg-gray-800 '/>
        </div>
       {
       currentState==='Login'
       ?''
       :
       <input type="text" className='w-full px-3 py-2 border border-gray-700'placeholder='Name' required />
       } 
         <input type="email" className='w-full px-3 py-2 border border-gray-700'placeholder='Email'required />
          <input type="password" className='w-full px-3 py-2 border border-gray-700'placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your password</p>
        {
          currentState==='Login'
          ? <p onClick={()=>setCountState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={()=>setCountState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default Login
