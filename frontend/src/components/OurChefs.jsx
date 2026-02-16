// import React, { useEffect, useRef } from 'react'

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from "gsap";

// gsap.registerPlugin(ScrollTrigger);




// const OurChefs = () => {


//       const Mainref = useRef(null);
//       const sectionRef = useRef(null);
//         const leftRef = useRef(null);


//       useEffect(() => {
//           gsap.fromTo(sectionRef.current,{
//          y: -40,
//          scale: 1,

//          opacity: 1,
//        },{
//          y: 40,
//          opacity: 0.8,
//          scale: 0.9,
//          duration: 1,

//          scrollTrigger:{
//            trigger: Mainref.current,
//            start: "top 10%",
//            end: "bottom 65%",
//            scrub: 1,
//            // markers: true,
//          }

//        })
//        },
//          gsap.to(leftRef.current, {
//   y: 150,
//   scrollTrigger: {
//     trigger: Mainref.current,
//     start: "top 0%",
//     end:  "bottom 30%",
//     scrub: 3,
//     // markers: true,
//   },
// })
//        ,[])


//   return (

// <div  ref={Mainref}>
//     <section  ref={sectionRef} className="my-10 py-10 border-b-2 border-yellow-300">
//       <div className="mx-auto flex max-w-7xl px-10 flex-col md:flex-row gap-8 justify-between md:items-center">

//         {/* Left Content */}
//         <div ref={leftRef} className=" text-black">
//           <h2 className="text-4xl font-bold leading-tight">
//             We are more than <br />
//             <span className="text-amber-400">Multiple Services</span>
//           </h2>

//           <ul className="mt-6 space-y-4 text-xl md:text-2xl text-black/80">
//             <li>• Online Ordering</li>
//             <li>• Table Reservations</li>
//             <li>• Takeaway & Delivery</li>
//           </ul>

//           {/* <button className="mt-10 rounded-full border border-white px-8 py-3 text-lg transition hover:bg-white hover:text-black">
//             Explore Services
//           </button> */}
//         </div>

//         {/* Right Image */}
//         <div className="relative overflow-hidden rounded-3xl">
//           <img
//             src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg"
//             alt="Our Chefs"
//             className=" md:h-[480px] w-full object-cover"
//           />
//         </div>

//       </div>
//     </section>
//     </div>
//   )
// }

// export default OurChefs


import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurChefs = () => {
  const mainRef = useRef(null);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // SECTION animation
      // gsap.fromTo(
      //   sectionRef.current,
      //   {
      //     y: -40,
      //     scale: 1,
      //     opacity: 1,
      //   },
      //   {
      //     y: 40,
      //     scale: 0.95,
      //     opacity: 0.9,
      //     scrollTrigger: {
      //       trigger: mainRef.current,
      //       start: "top 10%",
      //       end: "bottom 65%",
      //       scrub: 1,
      //       // markers: true,
      //     },
      //   }
      // );
      gsap.fromTo(
        sectionRef.current,
        { y: 150 },
        {
          y: -200,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            // markers: true,
            scrub: true,
          }
        }
      );


      // LEFT CONTENT parallax
      gsap.to(leftRef.current, {
        y: 150,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "0% 10%",
          end: "bottom 60%",
          scrub: 3,
          // markers: true,
          scrub: true,
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);



  return (
    <div ref={mainRef}>
      {/* <section
        ref={sectionRef}
        className="my-10 py-10 border-b-2 border-yellow-300"
      > */}
      <section
        ref={sectionRef}
        className="relative z-20  pt-20 bg-white rounded-t-[0px]"
      >

        <div className="mx-auto flex max-w-7xl px-10 flex-col md:flex-row gap-8 justify-between md:items-center">

          {/* Left Content */}
          <div ref={leftRef} className="text-black">
            <h2 className="text-4xl font-bold leading-tight">
              We are more than <br />
              <span className="text-amber-400">Multiple Services</span>
            </h2>

            <ul className="mt-6 space-y-4 text-xl md:text-2xl text-black/80">
              <li>• Online Ordering</li>
              <li>• Table Reservations</li>
              <li>• Takeaway & Delivery</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg"
              alt="Our Chefs"
              className="md:h-[480px] w-full object-cover"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default OurChefs;
