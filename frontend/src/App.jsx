import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './pages/Cart'


function App() {
 

  return (
   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
         
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>          
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/> 
          <Route path='/place-order' element={<Placeorder/>}/> 
          <Route path='/orders' element={<Order/>}/> 
       </Routes>
       <Footer/>
   </div>
  )
}

export default App
 