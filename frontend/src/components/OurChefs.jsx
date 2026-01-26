const OurChefs = () => {
  return (
    <section className="bg-black/25 py-24">
      <div className="mx-auto flex max-w-7xl items-center gap-16 px-10">

        {/* Left Content */}
        <div className="w-1/2 text-white">
          <h2 className="text-5xl font-bold leading-tight">
            We are more than <br />
            <span className="text-amber-400">Multiple Services</span>
          </h2>

          <ul className="mt-8 space-y-4 text-xl text-gray-300">
            <li>• Online Ordering</li>
            <li>• Table Reservations</li>
            <li>• Takeaway & Delivery</li>
          </ul>

          {/* <button className="mt-10 rounded-full border border-white px-8 py-3 text-lg transition hover:bg-white hover:text-black">
            Explore Services
          </button> */}
        </div>

        {/* Right Image */}
        <div className="relative w-1/2 overflow-hidden rounded-3xl">
          <img
            src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg"
            alt="Our Chefs"
            className="h-[480px] w-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default OurChefs
