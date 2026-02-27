import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const mask = `radial-gradient(circle 240px at ${x}px ${y}px, transparent 0%, black 400px)`;

      if (overlayRef.current) {
        overlayRef.current.style.maskImage = mask;
        overlayRef.current.style.webkitMaskImage = mask;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);



  return (
    <div className="relative w-screen h-screen from-yellow-900 via-yellow-200 to-gray-300 text-black overflow-hidden">
      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <h1 className="text-6xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          to="/"
          className="text-white rounded-full bg-yellow-400 px-6 py-3 font-semibold hover:bg-yellow-800 hover:scale-110 transition"
        >
          Go Home
        </Link>
      </div>

      {/* Spotlight overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 z-20 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle 240px at 50% 50%, transparent 0%, black 400px)",
          WebkitMaskImage:
            "radial-gradient(circle 240px at 50% 50%, transparent 0%, black 400px)",
        }}
      />
    </div>
  );
};

export default Pagenotfound;