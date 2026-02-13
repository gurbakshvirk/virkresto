import React, { useEffect, useRef, useState } from 'react'
import PopularCard from './PopularCard'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { getPopularProducts } from '../services/productservice';

gsap.registerPlugin(ScrollTrigger);

const PopularSection = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  const headingText = useRef(null);
  const mainRef = useRef(null);
  const cardsSec = useRef(null);

  // ✅ Fetch Popular Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularProducts();
        setPopularProducts(data);
      } catch (err) {
        console.error("Failed to fetch PopularProducts", err);
      }
    };

    fetchData();
  }, []);

  // ✅ GSAP Animation
  useEffect(() => {

    gsap.fromTo(headingText.current , {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "-60% 40%",
        end: "bottom 65%",
        scrub: 2,
      }
    });

    gsap.fromTo(cardsSec.current, {
      scale: 0.7,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "0% 60%",
        end: "bottom 100%",
        scrub: 1,
      }
    });

  }, []);

  return (
    <div ref={mainRef} className="relative z-10 px-2 md:px-20 p-20 bg-white">

      {/* Heading */}
      <div ref={headingText} className='mb-10 text-center md:mx-20'>
        <h1 className='text-black text-4xl md:text-6xl font-bold'>Popular</h1>
        <div className='border-2 border-yellow-300 w-24 mx-auto mt-4'></div>
      </div>

      {/* Slider */}
      <div ref={cardsSec}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >

          {popularProducts.map(product => (
            <SwiperSlide className='px-6' key={product._id}>
              <PopularCard
                title={product.name}
                image={product.images} // show first image
              />
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </div>
  )
}

export default PopularSection
