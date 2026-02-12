const ReviewCard2 = ({ text, author }) => {
  return (
    <div className="bg-white w-80 md:w-96 p-8 shadow-xl relative rounded-sm">

      {/* Top Orange Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-600"></div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mt-6">
        “{text}”
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-8">
        <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold">
          {author}
        </div>

        <div className="font-serif italic text-[#4b2e2e] text-lg">
          {author}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard2;
