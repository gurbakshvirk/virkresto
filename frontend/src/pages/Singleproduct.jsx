import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../services/productservice'
import { useEffect, useState } from 'react'
import AddToCartButton from '../components/AddtoCartbtn'
// import style from '../pages/SingleProduct.css'
import "./SingleProduct.css";

const SingleProductPage = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id)
        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])


  // const getImageUrl = (url) =>
  //   url
  //     ? url
  //     : `${process.env.REACT_APP_API_URL}${url}`;

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[currentIndex]);
    }
  }, [currentIndex, product]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  // console.log(product)
  if (loading) return <p className="p-10">Loading...</p>
  if (!product) return <p className="p-10">Product not found</p>

  return (
    <div className="my-20 p-10 ">
      {/* <h1 className="text-black text-4xl font-bold mb-6">
        {product.name}
      </h1>

      <img
        src={product.images[0].url}
        alt={product.title}
        className="h-72 mx-auto"
      />
  {product.images.length > 1 && (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">More Images</h2>

      <div className="flex gap-4 flex-wrap justify-center">
        {product.images.slice(1).map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`product-${index}`}
            className="h-40 w-40 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  )}

      <p className="mt-6">{product.description}</p>
      <p className="mt-4 text-2xl font-bold">₹ {product.price}</p>
      <p className="mt-4 text-2xl font-bold">{product.description}</p>
       <p className="mt-4 text-2xl font-bold">{product.isAvailable}</p>
      <p className="mt-4 text-2xl font-bold">{product.shortdescription}</p>


      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-black text-white rounded">
          Buy now
        </button>

        <button className="px-6 py-2 border border-black rounded">
          Add to cart
        </button>
        <AddToCartButton item={product}/> 
      </div>





 */}













      <div className="page">

        {/* ================= PRODUCT ================= */}
        <section className="product">

          {/* ---------- THUMBNAILS ---------- */}
          <div className="thumbs">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={product.name}
                className={currentIndex === i ? "active" : ""}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>

          {/* ---------- MAIN IMAGE ---------- */}
          <div className="main-image">
            <button className="slide-btn left" onClick={prevImage}>‹</button>

            <img
              src={product.images[currentIndex]?.url}
              alt={product.name}
              className="h-120 mx-auto"
            />

            <button className="slide-btn right" onClick={nextImage}>›</button>

          </div>

          {/* ---------- INFO ---------- */}
          <div className="info">
            <h1 className="text-black text-4xl font-bold mt-20"> {product.name}</h1>

            <div className="mt-4 text-2xl font-bold mt-5">₹{product.price}</div>

            {/* <div className={`stock ${product.stock > 0 ? "in" : "out"}`}>
            <span className="dot"></span>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </div> */}

            <p className="desc text-2xl">{product.shortdescription}</p>

            <div className="actions-box">

              <button
                className="px-6 py-2  bg-purple-500 border rounded-4xl mx-4"
              // onClick={() => navigate(`/buynow/${product._id}`)}
              >
                Buy Now
              </button>
                <AddToCartButton item={product} />


              <div className="secondary-actions">
                {/* <button
                className="btn add"
                // disabled={product.stock < 1}
                // onClick={() => addToCart(product._id)}
              > */}
                {/* Add To Cart */}
                {/* </button> */}


              </div>

            </div>
          </div>
        </section>


        {/* ================= DESCRIPTION ================= */}
        <section className="details">
          <div className="details-left">
            <h3>Description</h3>
            {/* <p>{product.description}</p> */}
            <p>{product.description}</p>
          </div>
        </section>

      </div>
    </div>

    // from other website


  )
}

export default SingleProductPage
