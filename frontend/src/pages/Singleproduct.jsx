import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../services/productservice'
import { useEffect, useState } from 'react'
import AddToCartButton from '../components/AddtoCartbtn'

const SingleProductPage = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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
// console.log(product)
  if (loading) return <p className="p-10">Loading...</p>
  if (!product) return <p className="p-10">Product not found</p>

  return (
    <div className="my-20 p-10 bg-red-500">
      <h1 className="text-black text-4xl font-bold mb-6">
        {product.name}
      </h1>
      {/* <p className="mt-4 text-2xl font-bold">{product.}</p> */}

      <img
        src={product.images[0].url}
        alt={product.title}
        className="h-72 mx-auto"
      />
{/* Other Images Section */}
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
      {/* <p className="mt-4 text-2xl font-bold">{product.isAvailable}</p> */}
      <p className="mt-4 text-2xl font-bold">{product.shortdescription}</p>


      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-black text-white rounded">
          Buy now
        </button>

        {/* <button className="px-6 py-2 border border-black rounded">
          Add to cart
        </button> */}
        <AddToCartButton item={product}/>
      </div>
    </div>
  )
}

export default SingleProductPage
