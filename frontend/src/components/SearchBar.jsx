import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const SearchBar = () => {
     const {setSearch,search}=useContext(ShopContext);
  return (
    <div className='transparent my-5  bg-[#4e37d30e] h-12 flex flex-row  items-center justify-around  rounded-full'>
      <input type="text" className='w-2/3 outline-none h-8 ' placeholder='Search Product...' value={search}
      onChange={(e) => setSearch(e.target.value)} />
      <img src={assets.search_icon} alt="" className='w-6'
      />
    </div>
  )
}

export default SearchBar
