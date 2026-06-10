import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import SearchBar from '../components/SearchBar'



const collection = () => {
  const {products}= useContext(ShopContext)
  const [showFilter, setShowFilter]=useState(false)
  const [filterPdt,setFilterPdt]=useState([])
  const [category,setCategory]= useState([]);
  const [subCategary,setSubCategory]=useState([])
  const [sortType, setSortType] = useState('relevant');
  const {showBar,setSearch,search}=useContext(ShopContext);

  // adding categary in arry
  const toggleCategary=(e)=>{
      if(e.target.checked){
        setCategory((prev)=>[...prev,e.target.value])
      }
      else{
        setCategory((prev)=>{
       return   prev.filter((item)=>item!==e.target.value)
        })
      }
  }

// adding sub categray in arry 
  const toggleSubCategory = (e) => {
  if (e.target.checked) {
    setSubCategory((prev) => [...prev, e.target.value]);
  } else {
    setSubCategory((prev) =>
      prev.filter((item) => item !== e.target.value)
    );
  }
};

 const applyFilter = () => {
  let productsCopy = products.slice();

  // Category Filter
  if (category.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      category.includes(item.category)
    );
  }

  // Sub Category Filter
  if (subCategary.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      subCategary.includes(item.subCategory)
    );
  }
  //  sort by price
  if (sortType === "low-high") {
    productsCopy.sort((a, b) => a.price - b.price);
  } else if (sortType === "high-low") {
    productsCopy.sort((a, b) => b.price - a.price);
  }
  // searchbar
   if (search && search.trim() !== "") {
    productsCopy = productsCopy.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  

  setFilterPdt(productsCopy);
};


useEffect(() => {
  applyFilter();
  
}, [category, subCategary, products,sortType,search]);







  return (
    <> {
      showBar?
      <SearchBar/>
      :''
    }
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 cursor-pointer '>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt="" />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter?'':"hidden"}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Men'} className='w-3 cursor-pointer  ' onChange={toggleCategary}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Women'} className='w-3 cursor-pointer  ' onChange={toggleCategary}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Kids'} className='w-3 cursor-pointer  ' onChange={toggleCategary}/>Kids
            </p>
          </div>
            
        </div>
        {/* subCategary filter */}

         <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block my-5 ${showFilter?'':"hidden"}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Topwear'} className='w-3 cursor-pointer  ' onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Bottomwear'} className='w-3 cursor-pointer  ' onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox"  value={'Winterwear'} className='w-3 cursor-pointer  ' onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
            
        </div>


      </div>
      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* product sort */}
          <select  onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2  sm:relative'>
            <option value="relevant">Sort by: relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
          <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6 '>
             {
                filterPdt.map((item, index) => (
    <ProductItem 
        key={index}
        id={item._id}
        image={item.image}
        name={item.name}
        price={item.price}
    />
))
             }
        </div>
      </div>
      
    </div>
    </>
  )
}

export default collection
