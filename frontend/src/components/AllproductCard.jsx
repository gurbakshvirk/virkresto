import AddToCartButton from "./AddtoCartbtn"
import { Link } from "react-router-dom"
const AllproductCard = ({ item }) => {
  return (
    <div className="w-[280px] bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col">

      {/* Image (fixed height) */}
      <div className="h-[250px] w-full overflow-hidden">

        <img
          src={item.images[0].url}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-3 bg-[#f4eadc]">

        {/* Title + Price */}
        <div >
          <div className="flex justify-between items-start gap-2">
            <h2 className="font-bold text-lg line-clamp-2 min-h-[3.5rem]">
              {item.name}
            </h2>



            <p className="font-bold text-lg whitespace-nowrap">
              ₹{item.price}
            </p>

          </div>
          <p className="font-bold text-sm line-clamp-2">
            {item.shortdescription}
          </p>
          {/* rating div  */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-400"> ★★★★★</span>
            {/* <span className="text-sm text-gray-600">5</span> */}
          </div>
          {/* <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[2.5rem]">
            Delicious and freshly prepared just for you.
          </p> */}
        </div>



        {/* Button */}
        <div className="mt-1 flex gap-4">
          <Link to={`/menu/${item.id}`}>
            <button className="text-sm  rounded-full border border-black px-6 py-2 font-semibold hover:bg-white hover:scale-95 hover:text-black transition">
              View
            </button>
          </Link>

          <AddToCartButton item={item} />
        </div>
        {/* <button className="mt-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-all">
          Order Now
        </button> */}
      </div>
    </div>
  );
};

export default AllproductCard
