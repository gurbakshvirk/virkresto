import AddToCartButton from "./AddtoCartbtn"
import { Link } from "react-router-dom"

const MenuPageCard = ({ item }) => {
  return (
    // <div className="bg-white w-84 md:w-72 rounded-xl flex flex-col p-5">
    <div className="bg-white w-80 md:w-72 rounded-2xl flex flex-col p-5
shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-black">



      <div className="text-center w-full">
        <img
          src={item.image}
          alt={item.title}
          className="h-[320px] md:h-64 object-cover"
        />
      </div>

      {/* <h2 className="text-md md:text-xl font-semibold my-2">
        {item.title}
      </h2> */}
      <h2 className="text-md md:text-md font-semibold my-2 line-clamp-2 min-h-[3.5rem]">
        {item.title}
      </h2>


      <p className=" text-md text-black">₹ {item.price}</p>

      {/* rating div  */}
      <div className="flex items-center gap-1">
        <span className="text-yellow-400"> ★★★★★</span>
        {/* <span className="text-sm text-gray-600">5</span> */}
      </div>

      <div className="mt-2 flex gap-4">
        <Link to={`/menu/${item.id}`}>
          <button className="text-sm  rounded-full border border-black px-6 py-2 font-semibold hover:bg-white hover:scale-95 hover:text-black transition">
            View
          </button>
        </Link>

        <AddToCartButton item={item} />
      </div>
    </div>
  )
}

export default MenuPageCard
