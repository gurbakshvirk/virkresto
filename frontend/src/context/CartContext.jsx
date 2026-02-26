// import { createContext, useContext, useEffect, useState } from "react"
// import { toast } from "react-toastify"

// const CartContext = createContext()

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([])

//   // Load cart from localStorage once
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
//     setCart(storedCart)
//   }, [])

//   // Save cart whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart))
//   }, [cart])

//   const addToCart = (item) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(i => i.id === item._id)

//       if (existingItem) {
//         toast.success("Cart Updated successfully")
//         return prevCart.map(i =>
//           i.id === item._id
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         )
//       }

//       toast.success("Added to Cart successfully")

//       return [
//         ...prevCart,
//         {
//           id: item._id,
//           name: item.name,
//           price: item.price,
//           image: item.images?.[0]?.url,
//           quantity: 1
//         }
//       ]
//     })
//   }

//   const updateQuantity = (id, newQty) => {
//     setCart(prevCart =>
//       prevCart
//         .map(item =>
//           item.id === id ? { ...item, quantity: newQty } : item
//         )
//         .filter(item => item.quantity > 0)
//     )
//   }

//   const removeItem = (id) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== id))
//   }

//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   )

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         removeItem,
//         totalPrice
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export const useCart = () => useContext(CartContext)



import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify"
import { useAuth } from "./authcontext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {

const { isLoggedIn } = useAuth();
const navigate = useNavigate();


// read from localStorage first

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) 
    : [];
  });

    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // const [cart, setCart] = useState([]);
  const addToCart = (food) => {
    if (!isLoggedIn) {
    toast.error("You must be logged in to add items to cart");
    navigate("/login");
    return;
  }
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item._id === food._id);

      if (existing) {
        return oldCart.map((item) =>
          item._id === food._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      toast.success("Added to Cart successfully")

      return [...oldCart, { ...food, qty: 1 }];
    }
  );
  };

    const clearCart = () => setCart([]);


function increaseQty(id) {
  setCart((oldCart) =>
    oldCart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    )
  );
      // toast.success("Added to Cart successfully")

}

function decreaseQty(id) {
  setCart((oldCart) =>
    oldCart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0) 
  );
}
function removeItem(id) {
  setCart((oldCart) =>
    oldCart.filter((item) => item._id !== id)
  );
      toast.warn("Added to Cart successfully") 

}

console.log(cart)
  return (
    <CartContext.Provider value={{ cart , addToCart , increaseQty,removeItem, decreaseQty, clearCart }}>
      {children}
    
    </CartContext.Provider>
  );
};