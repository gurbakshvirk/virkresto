import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../services/productservice'
import { useEffect, useState } from 'react'

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

  if (loading) return <p className="p-10">Loading...</p>
  if (!product) return <p className="p-10">Product not found</p>

  return (
    <div className="my-20 p-10 bg-white/50">
      <h1 className="text-black text-4xl font-bold mb-6">
        {product.title}
      </h1>

      <img
        src={product.image}
        alt={product.title}
        className="h-72 mx-auto"
      />

      <p className="mt-6">{product.description}</p>
      <p className="mt-4 text-2xl font-bold">₹ {product.price}</p>

      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-black text-white rounded">
          Buy now
        </button>

        <button className="px-6 py-2 border border-black rounded">
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default SingleProductPage
