import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewletterBox from '../components/NewletterBox'
import DisCount from './DisCount'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <DisCount/>
      <BestSeller/>
      <OurPolicy/>
      <NewletterBox/>
      
    </div>
  )
}

export default Home
