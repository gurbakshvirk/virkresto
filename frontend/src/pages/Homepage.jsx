import React from 'react'
import Hero from '../components/Hero'
import PopularSection from '../components/Popularsection'
import MenuSection from '../components/Menusection'
import BookTablesec from '../components/BookTableSec'
import OurChefs from '../components/OurChefs'
import ReviewSec from '../components/Reviewsec'

const Homepage = () => {
  return (
    <div>
      <Hero/>
      <PopularSection/>
      {/* <MenuSection/> */}
      <BookTablesec/>
      <OurChefs/>
      <ReviewSec/>
      

    </div>
  )
}

export default Homepage
