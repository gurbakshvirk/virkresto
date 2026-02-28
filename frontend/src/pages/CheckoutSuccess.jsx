import { useEffect, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

const CheckoutSuccess = () => {
  const { clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Payment Successful
        </h1>
        <p className="mb-6 text-gray-600">
          Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default CheckoutSuccess