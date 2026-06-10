import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import about from './pages/about'
import contact from './pages/contact'
import Product from './pages/Product'
import login from './pages/login'
import placeorder from './pages/placeorder'
import order from './pages/order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './pages/cart'


function App() {
 

  return (
   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
         
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/about' element={<about/>}/>
          <Route path='/contact' element={<contact/>}/>          
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<login/>}/> 
          <Route path='/place-order' element={<placeorder/>}/> 
          <Route path='/order' element={<order/>}/> 
       </Routes>
       <Footer/>
   </div>
  )
}

export default App
 