import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const BookTablesec = () => {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 detect when we return to homepage

  useLayoutEffect(() => {
    // Only run when we are on homepage
    if (location.pathname !== "/") return;

    const ctx = gsap.context(() => {

      // reset state before animating (important when coming back)
      gsap.set(sectionRef.current, { y: 120 });

      gsap.to(sectionRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% 100%",
          end: "top 0%",
          scrub: 1.2,
          invalidateOnRefresh: true, // 👈 recalculates on revisit
        }
      });

    }, wrapperRef);

    // allow layout/images to settle before measuring
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => ctx.revert(); // clean when leaving route

  }, [location.pathname]); // 👈 rerun when navigating back

  return (
    <div ref={wrapperRef} className="relative z-20 -mt-16 m-4">

      <section
        ref={sectionRef}
        className="relative bg-white rounded-4xl shadow-2xl m-4 h-[50vh] overflow-hidden border-2 md:m-10 md:h-[70vh]"
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

          <button
            onClick={() => navigate("/reservation")}
            className="mt-8 rounded-full border border-white px-10 py-3 text-lg transition hover:bg-white hover:text-black"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookTablesec;
