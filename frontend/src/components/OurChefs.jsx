const OurChefs = () => {
  return (
    <section className="my-10 py-10 border-b-2 border-yellow-300">
      <div className="mx-auto flex max-w-7xl px-10 flex-col md:flex-row gap-8 justify-between md:items-center">

        {/* Left Content */}
        <div className=" text-black">
          <h2 className="text-4xl font-bold leading-tight">
            We are more than <br />
            <span className="text-amber-400">Multiple Services</span>
          </h2>

          <ul className="mt-6 space-y-4 text-xl md:text-2xl text-black/80">
            <li>• Online Ordering</li>
            <li>• Table Reservations</li>
            <li>• Takeaway & Delivery</li>
          </ul>

          {/* <button className="mt-10 rounded-full border border-white px-8 py-3 text-lg transition hover:bg-white hover:text-black">
            Explore Services
          </button> */}
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg"
            alt="Our Chefs"
            className=" md:h-[480px] w-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default OurChefs
