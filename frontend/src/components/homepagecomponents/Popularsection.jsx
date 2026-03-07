import React, { useEffect, useRef, useState } from 'react'
import PopularCard from '../PopularCard'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { getPopularProducts } from '../../services/productservice';

gsap.registerPlugin(ScrollTrigger);

const PopularSection = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  const headingText = useRef(null);
  const mainRef = useRef(null);
  const cardsSec = useRef(null);

  //  Fetch Popular Products
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

  //  GSAP Animation
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
    <section ref={mainRef} 
    data-theme="light"
    // className="relative z-10 px-2 md:px-20 p-20 bg-white">
    className="relative z-10 px-4 md:px-20 py-12 md:py-20 bg-white">

      {/* Heading */}
      <div ref={headingText} className='mb-10 text-center md:mx-20'>
        <h1 className='text-black text-4xl md:text-6xl font-bold'>Popular</h1>
        <div className='border-2 border-yellow-300 w-24 mx-auto mt-4'></div>
      </div>

      {/* Slider */}
      <div ref={cardsSec}>
        {/* <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        > */}
        <Swiper
  modules={[Navigation, Pagination]}
  navigation
  spaceBetween={20}
  breakpoints={{
    0: { slidesPerView: 1.1 },   // mobile
    640: { slidesPerView: 2 },   // tablets
    1024: { slidesPerView: 4 },  // desktop
  }}
>

          {popularProducts.map(product => (
            <SwiperSlide
            //  className='px-6'
            
             className='px-2 sm:px-4 md:px-6'
             key={product._id}>
              <PopularCard
                title={product.name}
                image={product.images}
                id={product._id} 
              />
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </section>
  )
}

export default PopularSection
