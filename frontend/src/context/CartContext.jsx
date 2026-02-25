import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage once
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
  }, [])

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item._id)

      if (existingItem) {
        toast.success("Cart Updated successfully")
        return prevCart.map(i =>
          i.id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }

      toast.success("Added to Cart successfully")

      return [
        ...prevCart,
        {
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.images?.[0]?.url,
          quantity: 1
        }
      ]
    })
  }

  const updateQuantity = (id, newQty) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)