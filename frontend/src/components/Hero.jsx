const Hero = () => {
  return (
    <section className=" -my-30 relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://thumbs.dreamstime.com/b/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884.jpg"
        alt="Delicious Food"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-6 md:px-20 text-white">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Delicious Food,<br />Perfectly Served
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-200">
            Experience fresh flavors, warm hospitality, and unforgettable meals —
            dine in, take away, or order online with ease.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-6">
            <button className="rounded-full bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700 transition">
              Order Online
            </button>
            <button className="rounded-full border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition">
              Reserve Table
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
  