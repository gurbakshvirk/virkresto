import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useGsapRouteEffect(animationFn) {
  const location = useLocation();
  const scope = useRef();

  useLayoutEffect(() => {
    const ctx = animationFn(scope);

    // let layout settle before measuring
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => ctx && ctx.revert();
  }, [location.pathname]); // ← rerun on every navigation

  return scope;
}
