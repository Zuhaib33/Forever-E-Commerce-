import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink ,Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const navbar = () => {

    const [visible,setVisible]=useState(false)
    const {setShowBar,count,navigate,token , setToken , setItemcard}=useContext(ShopContext)

    const logOut = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setItemcard({})
        navigate("/login")
    }
  
     

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <img src={assets.logo} alt=""  className='w-36'/>
        </Link>
     <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className='flex flex-col items-center gap-1'> 
            <p>HOME</p>
            <hr className=' hidden w-2/3 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to="/collection" className='flex flex-col items-center gap-1'> 
            <p>COLLECTION</p>
            <hr className='hidden w-2/3 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to="/about" className='flex flex-col items-center gap-1'> 
            <p>ABOUT</p>
            <hr className='hidden w-2/3 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to="/contact" className='flex flex-col items-center gap-1'> 
            <p>CONTACT</p>
            <hr className='hidden w-2/3 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
     </ul>

     {/* left side */}

     <div className='flex items-center gap-6'>
        <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={()=>setShowBar(true)} />
         {/* for profile */}
        <div className='group relative'>
            <img onClick={()=>token? null:navigate("login")} src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/>

            {/* -------drop dwon--------------- */}
            {
                token &&
                <div className=' group-hover:block hidden absolute  right-0 pt-4 dropdown-menu'>
                <div className='flex flex-col w-36  gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className=' cursor-pointer hover:text-black '>My Profile</p>
                    <p onClick={()=>navigate("/orders")} className=' cursor-pointer hover:text-black '>Order</p>
                    <p className=' cursor-pointer hover:text-black ' onClick={()=>logOut()}>Logout</p>
                </div>
            </div>
            }
        </div>
         {/* for cart or order */}
        <Link to='/cart' className='relative'>
           <img src={assets.cart_icon} alt="" className='w-5'/>
           <p className='  absolute right-0 top-3 w-4 text-center bg-black text-white text-[9px] rounded-full font-extrabold'>{count}</p>
        </Link>
          
          <img  onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
     </div>

     {/* side bar menu for small screen */}
     <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
            <div className='flex gap-4 items-center p-3 cursor-pointer' onClick={()=>setVisible(false)}>
                <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                <p>Back</p>
            </div>
            <div className='flex flex-col gap-7 text-center mt-10 mx-5 '>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/about'>ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/contact'>CONTACT</NavLink>
            </div>
        </div>
     </div>

    </div>
  )
}

export default navbar
