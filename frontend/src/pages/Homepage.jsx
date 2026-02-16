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
  // const rightRef = useRef(null);
  // const heroRefImg = useRef(null);


  //  useEffect(() => {
  //      gsap.fromTo(catRef.current,{
  //     y: -40,
  //     scale: 0.8,

  //     opacity: 0.95,
  //   },{
  //     y: 40,
  //     opacity: 1,
  //     scale: 1,
  //     duration: 1,

  //     scrollTrigger:{
  //       trigger: mainRef.current,
  //       start: "35% 10%",
  //       end: "55% 65%",
  //       scrub: 1,
  //       markers: true,
  //     }

  //   })
  //   }, [])
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
