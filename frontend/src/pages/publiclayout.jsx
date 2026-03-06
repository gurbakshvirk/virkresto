import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PublicLayout = () => {
  const location = useLocation();

  //  LENIS — RUN ONLY ONCE
useLayoutEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);

    // IMPORTANT: update ScrollTrigger every frame
    ScrollTrigger.update();

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      } else {
        return window.scrollY;
      }
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({
    scroller: document.body,
  });

  ScrollTrigger.refresh();

  return () => {
    lenis.destroy();
  };
}, []);
  //  REFRESH ON ROUTE CHANGE
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, [location]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;