import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
  const navigate = useNavigate()

  const { cart, increaseQty, removeItem, decreaseQty } = useContext(CartContext)

  const deliveryCharges = 0

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )

  const finalPrice = subTotal + deliveryCharges


  const isEmpty = cart.length === 0

  return (
    <div
  className={`min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300 px-4 ${
    isEmpty
      ? "flex flex-col items-center pt-32 text-center min-h-auto"
      : "pt-32 pb-20"
  }`}
>
    {/* // <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-gray-200 via-white to-gray-300"> */}

      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-8 text-black">
          Your Cart
        </h1>
{isEmpty && (
  <div className="flex flex-col items-center justify-center gap-6">

    <img
      src="https://static.vecteezy.com/system/resources/previews/016/026/442/non_2x/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
      alt="Empty cart"
      className="w-60 md:w-72 opacity-90"
    />

    <p className="text-gray-600 text-lg">
      Your cart is empty
    </p>

    <button
      onClick={() => navigate("/menu")}
      className="mt-2 px-6 py-3 bg-black text-white rounded-xl
      hover:bg-gray-800 transition"
    >
      Menu??
    </button>

  </div>
)}

        {/* CART ITEMS */}
        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-6
              bg-white/40 backdrop-blur-lg border border-white/30
              shadow-lg rounded-2xl p-6"
            >

              {/* LEFT SECTION */}
              <div className="flex items-center gap-5">

                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-8 h-8 rounded-md border bg-white/60 hover:bg-white transition"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 rounded-md border bg-white/60 hover:bg-white transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 text-sm ml-3"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Item price ₹{item.price}
                </p>

                <p className="text-xl font-bold">
                  ₹{item.price * item.qty}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* TOTAL CARD */}

        {cart.length > 0 && (
          <div
            className="mt-10
            bg-white/40 backdrop-blur-lg border border-white/30
            shadow-lg rounded-2xl p-6 flex flex-col md:flex-row
            md:items-center md:justify-between gap-6"
          >

            <div className="space-y-2 text-gray-700">

              <p>Amount: ₹{subTotal}</p>

              <p>Delivery Charges: ₹{deliveryCharges}</p>

              <p className="text-sm text-gray-500">
                Tax calculated at checkout
              </p>

            </div>

            <div className="flex items-center gap-6">

              <div className="text-2xl font-bold">
                ₹{finalPrice}
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl
                hover:bg-emerald-700 transition shadow-md"
              >
                Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default CartPage