import React, { useEffect, useRef } from 'react'
import axios from 'axios';

import CategoryCard from '../CategoryCard'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { fetchCategories } from '../../services/productservice';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);


const CategorySection = () => {

  const API = import.meta.env.VITE_API_URL;


  const Mainref = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([null]);
  //   const rightRef = useRef(null);
  //   const heroRefImg = useRef(null);
  const [Categories, setCategories] = useState([]);


  // console.log(Categories)


  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories(); // assuming this returns array
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    getCategories();
  }, []);

  // useEffect(() => {
  //     const ctx = gsap.context(() => {
  //         gsap.fromTo(
  //             sectionRef.current,
  //             {
  //                 scale: 1.02,
  //                 opacity: 1,
  //                 transformOrigin: "center center",
  //             },
  //             {
  //                 scale: 0.9,
  //                 opacity: 0.01,
  //                 ease: "none",
  //                 scrollTrigger: {
  //                     trigger: sectionRef.current,
  //                     start: "5% 10%",
  //                     end: "bottom 0%",                
  //                     scrub: true,
  //                     pin: true,
  //                     pinSpacing: false,     
  //                     markers: true,
  //                 },
  //             }
  //         );
  //     }, sectionRef);

  //     return () => ctx.revert();
  // }, []);

  //  useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const section = sectionRef.current;
  //     const anim = section.querySelector(".category-anim");

  //     const contentHeight = anim.scrollHeight;
  //     const vh = window.innerHeight;

  //     // scroll duration (height-aware)
  //     const scrollLen = contentHeight + vh * 0.5;

  //     // convert 35% viewport to px (CORRECT way)
  //     const startPx = vh * 0.75;

  //     // REQUIRED when pinSpacing is false
  //     gsap.set(section, {
  //       paddingBottom: scrollLen,
  //     });

  //     gsap.to(anim, {
  //       y: -100,
  //       opacity: 0.2,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: section,
  //         start: () => `top+=${startPx} top`,
  //         end: () => `+=${scrollLen}`,
  //         scrub: true,
  //         pin: true,
  //         pinSpacing: false,
  //         // markers: true,
  //       },
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);
  useEffect(() => {
    if (Categories.length === 0) return; // wait until data is loaded

    const ctx = gsap.context(() => {
      // Animate the header
      gsap.from(".category-anim > div", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = gsap.utils.toArray(".category-card");

      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((e) => {
        gsap.fromTo(
          e,
          { scale: 1 },
          {
            scale: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: e,
              start: "top 20%",
              end: "top 0%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [Categories]); // <-- run this effect when categories are loaded



  // const Categories = [
  //     {
  //         id: 1,
  //         title: "Burger",
  //         image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  //         description: "Juicy grilled patty with fresh veggies and cheese"
  //     },

  //     {
  //         id: 3,
  //         title: "Pasta",
  //         image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  //         description: "Creamy pasta tossed with herbs and parmesan"
  //     },
  //     {
  //         id: 4,
  //         title: "Fries",
  //         image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
  //         description: "Crispy golden fries with house seasoning"
  //     },
  //     {
  //         id: 5,
  //         title: "Sandwich",
  //         image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  //         description: "Toasted sandwich packed with fresh fillings"
  //     },
  //     {
  //         id: 1,
  //         title: "Burger",
  //         image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  //         description: "Juicy grilled patty with fresh veggies and cheese"
  //     },

  //     {
  //         id: 3,
  //         title: "Pasta",
  //         image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  //         description: "Creamy pasta tossed with herbs and parmesan"
  //     },
  //     {
  //         id: 4,
  //         title: "Fries",
  //         image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
  //         description: "Crispy golden fries with house seasoning"
  //     },
  //     {
  //         id: 5,
  //         title: "Sandwich",
  //         image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  //         description: "Toasted sandwich packed with fresh fillings"
  //     },

  //     {
  //         id: 1,
  //         title: "Burger",
  //         image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  //         description: "Juicy grilled patty with fresh veggies and cheese"
  //     },

  //     {
  //         id: 3,
  //         title: "Pasta",
  //         image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  //         description: "Creamy pasta tossed with herbs and parmesan"
  //     },




  // ]
  return (
    // <div ref={Mainref}>
    //     <div className='my-10' ref={sectionRef}>
    //         <div className='text-center md:mx-20 '>
    //             <h1 className=' text-black text-4xl md:text-6xl font-bold'>Categories</h1>


    //             <div className='border-2 border-yellow-300 w-24 mx-auto mt-4'></div>
    //         </div>
    //         <div className="flex flex-wrap m-4 mx-auto justify-center    md:justify-center">
    //             {Categories.map(item => (

    //                 <div className="m-8 md:m-8 ">
    //                     <CategoryCard title={item.title} image={item.image} id={item.id} />
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // </div>

    <div ref={Mainref}>
      {/* PIN ONLY */}
      <div ref={sectionRef} className="relative">

        {/* ANIMATE ONLY THIS */}
        <div className="category-anim my-10">
          <div className="text-center md:mx-10">
            <h1 className="text-black text-4xl md:text-6xl font-bold">
              Categories
            </h1>
            <div className="border-2 border-yellow-300 w-24 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-wrap m-4 mx-auto justify-center">
            {Categories.map((item, i) => (
              <div key={i} className="m-8 category-card">
                <CategoryCard
                  title={item.name}
                  image={item.image.startsWith('http') ? item.image : `${API}${item.image}`}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

  )
}

export default CategorySection
