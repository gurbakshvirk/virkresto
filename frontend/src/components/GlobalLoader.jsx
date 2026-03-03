import { useLoader } from "../context/Loadercontext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="text-center text-white">
        
        {/* Brand Name */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest animate-pulse">
          DeliEat
        </h1>

        {/* Typing Effect Line */}
        <p className="mt-4 text-sm md:text-lg text-gray-300 overflow-hidden border-r-2 border-white whitespace-nowrap animate-typing">
          Serving Fresh Taste...
        </p>

      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            50% { border-color: transparent }
          }

          .animate-typing {
            width: 0;
            animation: typing 0.5s steps(5) forwards, blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default GlobalLoader;