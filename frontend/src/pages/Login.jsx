import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCountState] = useState('Login')

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  const onSubmitHandlder = async (event) => {
    event.preventDefault()

    // {--------backend api call--------}
    try {
          // {--------user sign up--------}
      if (currentState === "Sign Up") {

        const responce = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (responce.data.success) {
          setToken(responce.data.token)
          localStorage.setItem("token", responce.data.token)
          console.log(responce.data.message)
        } else {
          
          toast.error(responce.data.message)
        }
      //  {---------------for login-----------}
      } else {


        const responce = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password
          }
        )


        if (responce.data.success) {
          setToken(responce.data.token)
          localStorage.setItem("token", responce.data.token)
          
        } else {
          toast.error(responce.data.message)
        }


      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)

    }




  }


  useEffect(() => {
    if (token) {
      navigate("/")
    }
  },
    [token])

  return (
    <form onSubmit={onSubmitHandlder} className='flex flex-col items-center w-[90%]  sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none w-8 h-[1.5px] bg-gray-800 ' />
      </div>
      {
        currentState === 'Login'
          ? ''
          :
          <input onChange={(e) => (setName(e.target.value))} type="text" className='w-full px-3 py-2 border border-gray-700' placeholder='Name' required />
      }
      <input onChange={(e) => (setemail(e.target.value))} type="email" className='w-full px-3 py-2 border border-gray-700' placeholder='Email' required />
      <input onChange={(e) => (setpassword(e.target.value))} type="password" className='w-full px-3 py-2 border border-gray-700' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your password</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCountState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCountState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>{currentState}</button>
    </form>
  )
}

export default Login
