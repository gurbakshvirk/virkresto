import React, { useEffect, useRef } from 'react'
import Hero from '../components/homepagecomponents/Hero'
import PopularSection from '../components/homepagecomponents/Popularsection'
import MenuSection from '../components/Menusection'
import BookTablesec from '../components/homepagecomponents/BookTableSec'
import OurChefs from '../components/homepagecomponents/OurChefs'
import ReviewSec from '../components/Reviewsec'
import CategorySection from '../components/homepagecomponents/CategorySection'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import TextSec from '../components/TextSec'
import Testimonials from '../components/homepagecomponents/Testimonials'
import Allproducts from '../components/homepagecomponents/Allproducts'
import OffersSection from '../components/homepagecomponents/OfferSection'
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
