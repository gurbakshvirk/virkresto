const ReviewCard = ({ rating, text, author, product }) => {
  return (
    <div className="w-80 h-72 shrink-0 rounded-3xl border border-white/20 bg-black p-6 text-white shadow-lg flex flex-col justify-between">

      {/* Stars */}
      <div className="flex gap-1 text-yellow-400">
        {Array(rating).fill(0).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Review Text */}
      <p className="mt-3 text-gray-300 line-clamp-3">
        “{text}”
      </p>

      {/* Footer */}
      <div>
        <div className="mt-4 text-sm font-semibold">
          — {author}
        </div>

        <div className="text-xs text-gray-500">
          Reviewed: {product}
        </div>
      </div>

    </div>
  )
}

export default ReviewCard
  