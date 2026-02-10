import { useEffect, useState, useRef  } from "react"
// import React, { useEffect, useRef } from 'react'

import { getAllProducts } from "../services/productservice"
import MenuPageCard from "./MenuPageCard"

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);



const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([])
   const Mainref = useRef(null);
      const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setMenuItems(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, [])



  //  useEffect(() => {
  //         const ctx = gsap.context(() => {
  //             gsap.fromTo(
  //                 sectionRef.current,
  //                 {
  //                     scale: 0.9,
  //                     opacity: 1,
  //                 },
  //                 {
  //                     scale: 1,
  //                     opacity: 1,
  //                     ease: "none",
  //                     scrollTrigger: {
  //                         trigger: sectionRef.current, // SAME element
  //                         start: "0% 5%",
  //                         end: "bottom 0%",                // scroll distance
  //                         scrub: true,
  //                         pin: true,
  //                         pinSpacing: 2,     
  //                         markers: true,
  //                     },
  //                 }
  //             );
  //         }, sectionRef);
  
  //         return () => ctx.revert();
  //     }, []);
  useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 0%",
        end: "bottom 0%",        // total pinned scroll distance
        scrub: true,
        pin: true,
        pinSpacing: true,
        // markers: true,
      }
    });

    // PHASE 1 → section fully enters viewport
    tl.fromTo(
      sectionRef.current,
      {
        scale: 0.9,
        opacity: 0,
        borderRadius: "25%",
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,       // 30% of scroll
        ease: "none",
          borderRadius: "0%",
      }
    );

    // PHASE 2 → stay stable
    tl.to(sectionRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,        // 40% hold
      ease: "none",
        borderRadius: "0%",
    });

    // PHASE 3 → next section starts covering
    tl.to(sectionRef.current, {
      opacity: 0.8  ,
      scale: 1,
      duration: 0.2,        // last 30%
      ease: "none",
        borderRadius: "25%",
    });

  }, sectionRef);

  return () => ctx.revert();
}, []);

  

  return (
    <div ref={Mainref}>
    {/* <section  ref={sectionRef} className="py-12 md:h-screen bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300"> */}
      <section
  ref={sectionRef}
  className="py-12 md:h-screen overflow-hidden bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300"
>

      <div className=" text-center">
        {/* <h2 className="text-4xl md:text-5xl font-bold">All Products</h2> */}
        <h2 className="text-black text-4xl md:text-6xl font-bold">All Products</h2>

        
        <div className='border-2 border-white w-24 mx-auto mt-4'></div>
        <p className="mt-2 text-black">Explore our most loved dishes</p>
      </div>

      <div className="flex gap-10 overflow-x-auto md:px-20 snap-x snap-mandatory p-5 mx-7">
        {menuItems.map((item) => (
          <div key={item.id} className="snap-start">
            <MenuPageCard
            //   title={item.title}
            //   image={item.image}
            //   id={item.id}
            item={item}
            />
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}

export default MenuSection
