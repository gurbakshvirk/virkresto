import AddToCartButton from "./AddtoCartbtn"
import { Link } from "react-router-dom"
const AllproductCard = ({ item }) => {
  return (
    <div className="w-[280px] bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col">

      {/* Image (fixed height) */}
      <div className="h-[220px] w-full overflow-hidden">

        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-6 bg-[#f4eadc]">

        {/* Title + Price */}
        <div>
          <div className="flex justify-between items-start gap-2">
            <h2 className="font-bold text-lg line-clamp-2 min-h-[3.5rem]">
              {item.title}
            </h2>

            <p className="font-bold text-lg whitespace-nowrap">
              ₹{item.price}
            </p>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[2.5rem]">
            Delicious and freshly prepared just for you.
          </p>
        </div>

        {/* Button */}
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-all">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default AllproductCard
