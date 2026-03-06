import { useEffect, useState, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearCart } = useContext(CartContext)

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    const confirmPayment = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payment/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ sessionId }),
          }
        )

        const data = await res.json()

        if (res.ok) {
          setOrder(data.order)
          clearCart()
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) confirmPayment()
  }, [])

 const downloadInvoice = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/invoice`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res.ok) {
      throw new Error("Failed to download invoice")
    }

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${order._id}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()

    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error(err)
    alert("Could not download invoice")
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Verifying Payment...</h2>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Something went wrong.</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="mb-2 text-gray-700">
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mb-2 text-gray-700">
          <strong>Total Paid:</strong> ₹{order.totalAmount}
        </p>

        <button
          onClick={downloadInvoice}
          className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4"
        >
          Download Invoice
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-lg mt-3"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default CheckoutSuccess