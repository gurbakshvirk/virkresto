import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/productservice";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddtoCartbtn";

const SingleProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10">Product not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-lime-100 to-green-200 py-16 px-4 pt-32 overflow-hidden">

      {/* PRODUCT SECTION */}
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">

          {/* MAIN IMAGE */}
          <div className="relative group">
            <img
              src={product.images[currentIndex]?.url}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-2xl shadow-xl"
            />

            {/* arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2
              bg-black/40 backdrop-blur text-white w-9 h-9 rounded-full
              opacity-0 group-hover:opacity-100 transition"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2
              bg-black/40 backdrop-blur text-white w-9 h-9 rounded-full
              opacity-0 group-hover:opacity-100 transition"
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt=""
                onClick={() => setCurrentIndex(i)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                ${
                  currentIndex === i
                    ? "border-purple-500"
                    : "border-transparent"
                }
                hover:scale-105 transition`}
              />
            ))}
          </div>

        </div>


        {/* RIGHT SIDE INFO */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-purple-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            {product.shortdescription}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button
              className="px-6 py-3 rounded-full
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-semibold shadow-md
              hover:scale-105 transition"
            >
              Buy Now
            </button>

            <AddToCartButton item={product} />

          </div>

        </div>

      </section>


      {/* DESCRIPTION SECTION */}
      <section className="max-w-5xl mx-auto mt-16">

        <div className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-lg">

          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

        </div>

      </section>

    </div>
  );
};

export default SingleProductPage;