import { useEffect, useState } from "react"

const CartPage = () => {
  const [cart, setCart] = useState([])
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
  }, [])
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )



  const updateQuantity = (id, newQty) => {
  const updatedCart = cart
    .map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    )
    .filter(item => item.quantity > 0)

  setCart(updatedCart)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
}

const removeItem = (id) => {
  const updatedCart = cart.filter(item => item.id !== id)
  setCart(updatedCart)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
}




  return (
    <div className="min-h-screen px-10 py-20 text-black bg-white/80">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item.id} className="flex justify-between border-b py-4 ">
          <div className="">
            <img className="" src={item.image} alt="Product image" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
           <div className="flex items-center gap-4 mt-2">
  <button
    onClick={() => updateQuantity(item.id, item.quantity - 1)}
    className="px-3 py-1 border rounded"
  >
    −
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() => updateQuantity(item.id, item.quantity + 1)}
    className="px-3 py-1 border rounded"
  >
    +
  </button>

  <button
    onClick={() => removeItem(item.id)}
    className="ml-4 text-red-600"
  >
    Remove
  </button>
</div>

          </div>
          <p>₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div className="text-2xl font-bold mt-10">
        Total: ₹{totalPrice}
      </div>
    </div>
  )
}
export default CartPage
