import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../CategoryCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { fetchCategories } from "../../services/productservice";

gsap.registerPlugin(ScrollTrigger);

const CategorySection = () => {
  const API = import.meta.env.VITE_API_URL;

  const Mainref = useRef(null);
  const sectionRef = useRef(null);

  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (Categories.length === 0) return;

    const ctx = gsap.context(() => {
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

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 20%",
              end: "top 0%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [Categories]);

  return (
    <section ref={Mainref} data-theme="light">
      <div ref={sectionRef} className="relative overflow-hidden">
        <div className="category-anim my-10">

          {/* Title */}
          <div className="text-center md:mx-10 mb-10">
            <h1 className="text-black text-4xl md:text-6xl font-bold">
              Categories
            </h1>
            <div className="border-2 border-yellow-300 w-24 mx-auto mt-4"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto">
            {Categories.map((item, i) => (
              <div key={i} className="category-card w-full">
                <CategoryCard
                  title={item.name}
                  image={
                    item.image.startsWith("http")
                      ? item.image
                      : `${API}${item.image}`
                  }
                  id={item.id}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CategorySection;