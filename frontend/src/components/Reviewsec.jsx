  import ReviewCard from "./ReviewCard"
  import React, { use, useEffect, useRef } from 'react'
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { gsap } from "gsap";
  gsap.registerPlugin(ScrollTrigger);
  const ReviewSec = () => {
  const mainref = useRef(null)
  const sectionref = useRef(null)
useEffect(() => {
  const ctx = gsap.context(() => {

    gsap.fromTo(
      sectionref.current,
      {
        scaleX: 0.10,
        scaleY: 0.95,
        opacity: 0.5,
        transformOrigin: "center center",
      },
      {
        scaleY: 1,
        scaleX: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainref.current,
          start: "top 50%",
          end: "top 0%",
          scrub: 2,
          // markers: true,
        },
      }
    );

  }, mainref);

  return () => ctx.revert();
}, []);
  // useEffect(()=>{
  //   const conteext = gsap.context(()=>{
  //     gsap.fromTo(sectionref.current, {
  //     })
  //   }  , )
  // })
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Absolutely delicious! Best burger I've ever had. Fresh and juicy.",
      author: "Aman Verma",
      product: "Classic Burger",
    },
    {
      id: 2,
      rating: 4,
      text: "Great taste and quick delivery. Pizza was still hot!",
      author: "Simran Kaur",
      product: "Cheese Pizza",
    },
    {
      id: 3,
      rating: 5,
      text: "Loved the flavors and presentation. Highly recommended.",
      author: "Rohit Sharma",
      product: "Grilled Sandwich",
    },
    {
      id: 4,
      rating: 5,
      text: "Perfect fries—crispy outside and soft inside.",
      author: "Neha Patel",
      product: "French Fries",
    },
    {
      id: 5,
      rating: 4,
      text: "Pasta was creamy and well seasoned. Portion size was great.",
      author: "Karan Mehta",
      product: "White Sauce Pasta",
    },
    {
      id: 6,
      rating: 5,
      text: "Amazing taste and premium quality ingredients.",
      author: "Pooja Singh",
      product: "Paneer Burger",
    },
    {
      id: 7,
      rating: 4,
      text: "Fast service and friendly staff. Will visit again.",
      author: "Arjun Malhotra",
      product: "Veg Pizza",
    },
    {
      id: 8,
      rating: 5,
      text: "Best takeaway experience I've had in a long time.",
      author: "Riya Kapoor",
      product: "Combo Meal",
    },
    {
      id: 9,
      rating: 5,
      text: "Everything was fresh and perfectly cooked.",
      author: "Mohit Jain",
      product: "Cheese Sandwich",
    },
    {
      id: 10,
      rating: 4,
      text: "Great ambiance and even better food!",
      author: "Anjali Gupta",
      product: "Chef’s Special",
    },
  ]
    return (
      <div ref={mainref}>
      <section className= " mt-30 bg-white/90 h-screen overflow-hidden  rounded-4xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            What Our Customers Say
          </h2>
          {/* <p className="mt-4 text-gray-400">
            Real reviews from real food lovers
          </p> */}
        </div>
        {/* Cards */}
        <div  ref={sectionref}  className="flex gap-8 overflow-x-auto md:justify-center">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </section>
      </div>
    )
  }

  export default ReviewSec
