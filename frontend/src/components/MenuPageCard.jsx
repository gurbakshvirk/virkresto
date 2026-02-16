import AddToCartButton from "./AddtoCartbtn"
import { Link } from "react-router-dom"

const MenuPageCard = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
    <div className="flex gap-5 border-b pb-6">

      <img
        src={item.images[0].url}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{item.name}</h3>

          <p className="font-bold text-green-700">
            ₹{item.price}
          </p>
          {/* <Link to={`/product/${item._id}`}>
            <button className="text-sm  rounded-full border border-black px-6 py-2 font-semibold hover:bg-white hover:scale-95 hover:text-black transition">
              View
            </button>
          </Link> */}
        </div>


        <p className="text-gray-600 text-sm mt-1">
          {item.shortdescription}
        </p>

        <span className={`text-xs mt-2 inline-block px-2 py-1 rounded
          ${item.category.foodType === "veg"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
          }`}>
          {item.category.foodType}
        </span>
      </div>
    </div>
    </Link>
  )
}

// export default MenuPageCard


export default MenuPageCard
