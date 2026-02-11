  import React, { useEffect, useRef } from "react"
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { scale } from "motion"

  gsap.registerPlugin(ScrollTrigger)

  const BookTablesec = () => {
    const wrapperRef = useRef(null)
    const sectionRef = useRef(null)

//     useEffect(() => {
//   const ctx = gsap.context(() => {
//     gsap.set(sectionRef.current, {
//       y: 0,
//       scale: 1,
//     })

//     gsap.to(sectionRef.current, {
//       y: 40,
//       scale: 0.8,
//       ease: "none",
//       scrollTrigger: {
//         trigger: wrapperRef.current,
//         start: "top 50%",   // starts when section enters viewport
//         end: "bottom top",
//         scrub: 1,              // smooth but no lag
//         // markers: true,
//       },
//     })
//   })

//   return () => ctx.revert()
// }, [])
useEffect(() => {
  const ctx = gsap.context(() => {

    gsap.fromTo(
      sectionRef.current,
      { y:120 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        }
      }
    );

  });

  return () => ctx.revert();
}, []);



    return (
      // <div ref={wrapperRef}>
      <div ref={wrapperRef} className="relative z-20 -mt-32 m-4 ">
        

        <section
          ref={sectionRef}
          className="relative bg-white rounded-4xl shadow-2xl m-4 h-[50vh] overflow-hidden rounded-4xl border-2 md:m-10 md:h-[70vh]"
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
