import React, { useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import PopularSection from '../components/Popularsection'
import MenuSection from '../components/Menusection'
import BookTablesec from '../components/BookTableSec'
import OurChefs from '../components/OurChefs'
import ReviewSec from '../components/Reviewsec'
import CategorySection from '../components/CategorySection'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import TextSec from '../components/TextSec'
import Testimonials from '../components/Testimonials'
import Allproducts from '../components/Allproducts'
import OffersSection from '../components/OfferSection'
gsap.registerPlugin(ScrollTrigger);
const Homepage = () => {
  const catRef = useRef(null);
  const mainRef = useRef(null);
  return (
    <div className='' ref={mainRef}>
      <Hero />
      <TextSec />
      <PopularSection />
      <OffersSection />
      <BookTablesec />
      <div ref={catRef}>
        <CategorySection />
      </div>
      <Allproducts />
      {/* <MenuSection/> */}
      <OurChefs />
      <Testimonials />
      {/* <ReviewSec/> */}
    </div>
  )
}
export default Homepage
