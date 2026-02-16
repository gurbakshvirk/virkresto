import { useEffect, useState, useRef } from "react"
// import React, { useEffect, useRef } from 'react'

import { getAllProducts } from "../services/productservice"
import AllproductCard from "./AllproductCard"

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import './Allproductscss.css'

gsap.registerPlugin(ScrollTrigger);



const Allproducts = () => {
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
        // scrollTrigger: {
        //   trigger: sectionRef.current,
        //   start: "top 0%",
        //   end: "bottom 40%",        // total pinned scroll distance
        //   scrub: true,
        //   pin: true,

        //   pinSpacing: true,
        // }
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          // end: "+=100%",  
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers:true,  
          anticipatePin: 1,
        }
      });

      // PHASE 1 → section fully enters viewport
      tl.fromTo(
        sectionRef.current,
        {
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "none",
          borderRadius: "0%",
        }
      );

      // PHASE 2 → stay stable
      tl.to(sectionRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.1,        // 40% hold
        ease: "none",
        // borderRadius: "80%",
      });

      // PHASE 3 → next section starts covering
      tl.to(sectionRef.current, {
        opacity: 0.8,
        scale: 1,
        duration: 0.1,        // last 30%
        ease: "none",
        borderRadius: "25%",

      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <div ref={Mainref}>
      {/* <section  ref={sectionRef} className="py-12 md:h-screen bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300"> */}
      {/* <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden py-20 px-8 md:px-16 rounded-[60px] bg-gradient-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300"
      > */}
      <section
        ref={sectionRef}
        className="relative z-10 overflow-hidden h-screen py-20 px-8 md:px-16 rounded-[60px] bg-gradient-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300"
      >


        <div className=" text-center">
          {/* <h2 className="text-4xl md:text-5xl font-bold">All Products</h2> */}
          <h2 className="text-black text-4xl md:text-6xl font-bold">All Products</h2>


          <div className='border-2 border-white w-24 mx-auto mt-4'></div>
          <p className="mt-2 text-black">Explore our most loved dishes</p>
        </div>





        <Swiper className="reviewSwiper mt-4"
          modules={[Pagination, Pagination]}
          slidesPerView={"auto"}
          spaceBetween={20}
          centeredSlides={false}
          pagination={{ clickable: true }}
          // className="mt-8"
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {menuItems.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <AllproductCard item={item} id={item._id} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <Swiper
           modules={[Navigation, Pagination]}

          spaceBetween={10}
          slidesPerView={4}
          centeredSlides={true}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
              centeredSlides: false,
            },

          }}
          className="mt-10 px-6"
        >
          {menuItems.map((item) => (
            <SwiperSlide key={item.id}>
              <AllproductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper> */}
        <div className='hidden md:block'>
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
            II
          </button>

          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
            II
          </button>
        </div>
      </section >
    </div >
  )
}

export default Allproducts
