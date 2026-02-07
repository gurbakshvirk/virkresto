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
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center pt-48 md:flex-row md:pt-0 md:justify-between">


        {/* left text content div  */}
        {/* <div className="max-w-3xl px-6 sm:px-10 sm:ml-10 sm:w-1/2 text-white"> */}
        <div className="max-w-3xl px-6 md:px-10 md:ml-10 md:w-1/2 text-white md:text-left">


          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Delicious Food,<br />
            <span className="text-yellow-300">Perfectly Served</span>
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-200">
            Experience fresh flavors, warm hospitality, and unforgettable meals —
            dine in, take away, or order online with ease.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-6">
            <button className=" text-white rounded-full bg-yellow-400 px-6 py-3 font-semibold hover:bg-yellow-800 hover:scale-110 transition">
              Order Online
            </button>
            <button className="rounded-full border border-white px-6 py-3 font-semibold hover:bg-white hover:scale-95 hover:text-black transition">
              Reserve Table
            </button>
          </div>

        </div>

        {/* right image div  */}
        {/* <div className="m-20 sm sm:w-1/2 flex items-center justify-center flex-col"> */}
        <div className="mt-16 md:mt-0 md:w-1/2 flex items-center justify-center">

         <img
  src="https://images.unsplash.com/photo-1550547660-d9450f859349"
  className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-4xl border-2 border-yellow-300"
/>


          {/* <div className=" border-b border-2 w-48 border-yellow-300 "></div> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
