import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const heroRefImg = useRef(null);

  useEffect(() => {
    gsap.to(heroRefImg.current, {

      scrollTrigger: {
        trigger: heroRef.current,
        start: "10% 0%",
        end: "bottom 60%",
        scrub: true,
        // markers: true,
      },
      scale: 1.1,
      ease: "none",
    });



    gsap.fromTo(leftRef.current, {
      x: 60,
      opacity: 1,
    }, {
      x: -60,
      opacity: 1,
      duration: 1,

      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 10%",
        end: "bottom 65%",
        scrub: 1,
        // markers: true,
      }
    }),
      // gsap.to(rightRef.current, {
      // y: 150,
      // scrollTrigger: {
      //   trigger: heroRef.current,
      //   start: "top 0%",
      //   end:  "bottom 30%",
      //   scrub: 3,
      //   // markers: true,
      // },
      gsap.fromTo(
        rightRef.current,
        { y: 0 },   // always start centered
        {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true,
          }
        }
      );


  
}, [])
return (
  <section ref={heroRef} className="relative h-screen w-full overflow-hidden">

    {/* Background Image */}
    <img ref={heroRefImg}
      src="https://thumbs.dreamstime.com/b/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884.jpg"
      alt="Delicious Food"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Dark Overlay */}
    {/* <div className="absolute inset-0 bg-black/60"></div> */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>


    {/* Content */}
    <div className="relative z-10 flex h-full flex-col items-center pt-48 md:flex-row md:pt-0 md:justify-between" >


      {/* left text content div  */}
      {/* <div className="max-w-3xl px-6 sm:px-10 sm:ml-10 sm:w-1/2 text-white"> */}
      <div ref={leftRef} className="max-w-3xl px-6 md:px-10 md:ml-10 md:w-1/2 text-white md:text-left">


        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Delicious Food,<br />
          <span className="text-yellow-300">Perfectly Served</span>
        </h1>

        <p className="mt-6 text-base md:text-xl text-gray-200">
          Experience fresh flavors, warm hospitality, and unforgettable meals —
          dine in, take away, or order online with ease.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-6">
          <button className=" text-white rounded-full bg-yellow-400 px-6 py-3 font-semibold hover:bg-yellow-800 hover:scale-110 transition">
            Order Online
          </button>
          <button className="rounded-full border border-white px-6 py-3 font-semibold hover:bg-white hover:scale-95 hover:text-black transition">
            Reserve Table
          </button>
        </div>

      </div>

      {/* right image div  */}
      {/* <div className="m-20 sm sm:w-1/2 flex items-center justify-center flex-col"> */}
      <div ref={rightRef} className="mt-16 md:mt-0 md:w-1/2 flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349"
          className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-4xl border-2 border-yellow-300"
        />


        {/* <div className=" border-b border-2 w-48 border-yellow-300 "></div> */}
      </div>
    </div>
  </section>
)
}

export default Hero
