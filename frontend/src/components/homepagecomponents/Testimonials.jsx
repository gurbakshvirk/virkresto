import './Testimonials.css';
import React, { useEffect, useRef } from "react";
import ReviewCard2 from "../ReviewCars2";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);
const ReviewSec = () => {
    const mainref = useRef(null);
    const sectionref = useRef(null);

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

    const reviews = [
        {
            id: 1,
            text: "A few years ago connected friends of mine suggested that I join her one of the invitation only nights...",
            author: "Alison Burgas",
            image:
                "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
        },
        {
            id: 2,
            text: "Loved the flavors and presentation. Highly recommended restaurant.",
            author: "Dipti Lavi",
            image:
                "https://images.unsplash.com/photo-1550547660-d9450f859349",
        },
        {
            id: 3,
            text: "A few years ago connected friends of mine suggested that I join her one of the invitation only nights...",
            author: "Ali Burger",
            image:
                "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
        },
        {
            id: 4,
            text: "Loved the flavors and presentation. Highly recommended restaurant.",
            author: "Dimple ",
            image:
                "https://images.unsplash.com/photo-1550547660-d9450f859349",
        },
        {
            id: 5,
            text: "A few years ago connected friends of mine suggested that I join her one of the invitation only nights...",
            author: "Akusgcvjcjhvsecj",
            image:
                "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
        },
        {
            id: 6,
            text: "Loved the flavors and presentation. Highly recommended restaurant.",
            author: "Dipti",
            image:
                "https://images.unsplash.com/photo-1550547660-d9450f859349",
        },
    ];

    return (
        <div ref={mainref} className="bg-[#f4f4f4] py-24 rounded-3xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif text-[#4b2e2e]">
                    Hear From Our Customers
                </h2>
            </div>

            <div ref={sectionref} className=" relative px-6 md:px-16">
                <Swiper className="reviewSwiper"

                    slidesPerView={2}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 2 },
                    }}

                    spaceBetween={50}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    pagination={{ clickable: true }}
                    loop
                    modules={[Navigation, Pagination]}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                <ReviewCard2 {...review} />
                                <img
                                    src={review.image}
                                    alt="food"
                                    className="w-80 h-72 object-cover rounded-lg shadow-lg"
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* my buttonss*/}
                <div className='hidden md:block'>
                    <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10">
                        II
                    </button>

                    <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10">
                        II
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ReviewSec;



