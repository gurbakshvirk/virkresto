import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextSec = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        x: "-150%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
        //   end: "top 20% ",

          scrub: 1,
          pin: true,
          markers: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[70vh] bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 overflow-hidden flex items-center"
    >
      <h1
        ref={textRef}
         style={{
          WebkitTextStroke: "2px #5c3a00",
          textShadow: "6px 6px 12px rgba(0,0,0,0.45)",
        }}
        className="whitespace-nowrap text-[14vw] font-serif font-light px-12 textoutline-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900"
      >JUICY BURGERS • MELTING CHEESE • FIRE GRILLED • VIRKRESTO</h1>
    </section>
  );
};

export default TextSec;
