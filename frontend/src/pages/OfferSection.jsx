import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OffersSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        //   once: true, 
          invalidateOnRefresh: true
        }
      });

      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8
      });

      tl.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-gradient-to-r from-yellow-400 to-yellow-100"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Special Offers
          </h2>
          <p className="mt-4 text-gray-700">
            Grab exclusive deals before they’re gone
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Featured */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="bg-black text-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <span className="text-yellow-400 font-semibold uppercase tracking-wide">
              Today Only
            </span>

            <h3 className="text-5xl font-bold text-yellow-400 mt-4">
              40% OFF
            </h3>

            <p className="mt-4 text-gray-300">
              On All Burgers
            </p>

            <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
              Order Now
            </button>
          </div>

          {/* Card 2 */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <h4 className="text-2xl font-semibold text-gray-900">
              Free Drink
            </h4>

            <p className="mt-3 text-gray-600">
              On orders above ₹499
            </p>

            <button className="mt-6 bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300 transition">
              Claim
            </button>
          </div>

          {/* Card 3 */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <h4 className="text-2xl font-semibold text-gray-900">
              Family Combo
            </h4>

            <p className="mt-3 text-gray-600">
              Save ₹300 this weekend
            </p>

            <button className="mt-6 bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300 transition">
              View Deal
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OffersSection;
