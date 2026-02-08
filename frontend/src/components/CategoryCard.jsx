import React from 'react'

const CategoryCard = ({ image, title, id }) => {
  return (
    <div className="w-60 rounded-2xl overflow-hidden">
      <div className="relative group w-full">

        <img
          src={image}
          alt={title}
          className="h-[260px] w-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-8 bg-black/40 text-white">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2 className="text-sm">{id}</h2>
        </div>

      </div>
    </div>
  )
}

export default CategoryCard
