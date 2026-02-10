import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scale } from "motion"

gsap.registerPlugin(ScrollTrigger)

const BookTablesec = () => {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
     gsap.fromTo(sectionRef.current,{
    y: -40,
    scale: 1,

    opacity: 1,
  },{
    y: 40,
    opacity: 0.8,
    scale: 0.9,
    duration: 1,

    scrollTrigger:{
      trigger: wrapperRef.current,
      start: "top 10%",
      end: "bottom 65%",
      scrub: 1,
      // markers: true,
    }
  
  })
  }, [])

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="relative m-4 h-[50vh] overflow-hidden rounded-4xl border-2 md:m-10 md:h-[70vh]"
      >
        {/* Background Image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1670984939638-01d1854a5d12"
          alt="Book a table"
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Book a Table
          </h2>

          <p className="mt-4 text-sm md:text-lg text-gray-300 max-w-xl">
            Reserve your seat and enjoy a premium dining experience
          </p>

          <button className="mt-8 rounded-full border border-white px-10 py-3 text-lg transition hover:bg-white hover:text-black">
            Book Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default BookTablesec
