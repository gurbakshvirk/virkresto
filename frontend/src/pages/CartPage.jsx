// import { useEffect, useState } from "react"

// const CartPage = () => {
//   const [cart, setCart] = useState([])
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
//     setCart(storedCart)
//   }, [])
//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   )



//   const updateQuantity = (id, newQty) => {
//     const updatedCart = cart
//       .map(item =>
//         item.id === id ? { ...item, quantity: newQty } : item
//       )
//       .filter(item => item.quantity > 0)

//     setCart(updatedCart)
//     localStorage.setItem("cart", JSON.stringify(updatedCart))
//   }

//   const removeItem = (id) => {
//     const updatedCart = cart.filter(item => item.id !== id)
//     setCart(updatedCart)
//     localStorage.setItem("cart", JSON.stringify(updatedCart))
//   }





//   return (
//     <div className="min-h-screen px-10 py-20 text-black bg-white/80">
//       <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
//       {cart.length === 0 && <p>Your cart is empty</p>}
//       {cart.map(item => (
//         <div key={item.id} className="flex justify-between border-b py-4 ">
//           <div className="">
//             <img className="" src={item.image} alt="Product image" />
//             {/* Other Images Section */}
//             {/* {item.images.length > 1 && (
//               <div className="mt-10">
//                 <h2 className="text-2xl font-semibold mb-4">More Images</h2>

//                 <div className="flex gap-4 flex-wrap justify-center">
//                   {item.images.slice(1).map((img, index) => (
//                     <img
//                       key={index}
//                       src={img.url}
//                       alt={`product-${index}`}
//                       className="h-40 w-40 object-cover rounded-lg shadow"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )} */}
//             <h2 className="text-xl font-semibold">{item.name}</h2>
//             <div className="flex items-center gap-4 mt-2">
//               <button
//                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                 className="px-3 py-1 border rounded"
//               >
//                 −
//               </button>

//               <span>{item.quantity}</span>

//               <button
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 className="px-3 py-1 border rounded"
//               >
//                 +
//               </button>

//               <button
//                 onClick={() => removeItem(item.id)}
//                 className="ml-4 text-red-600"
//               >
//                 Remove
//               </button>
//             </div>

//           </div>
//           <p>₹{item.price * item.quantity}</p>
//         </div>
//       ))}
//       <div className="text-2xl font-bold mt-10">
//         Total: ₹{totalPrice}
//       </div>
//     </div>
//   )
// }
// export default CartPage


import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom";



const CartPage = () => {
  const navigate = useNavigate();

  const { cart, increaseQty, removeItem, decreaseQty, clearCart } = useContext(CartContext)
  // console.log(cart)



  const deliveryCharges = 0;

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const taxRate = 0.05; // 5% tax

  const tax = subTotal * taxRate;

  const finalPrice = subTotal + tax + deliveryCharges;


  return (
    <div className="min-h-screen mt-15 px-10 py-20 text-black bg-white/80">
      <h1 className="text-4xl font-bold mb-1">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div key={item._id} className="flex justify-between border-b py-4">
           <img
              src={item.images?.[0]?.url}
              alt={item.name}
              className="h-[120px] w-[120px] object-cover rounded"
            />
          <div>
           

            <h2 className="text-xl font-semibold">{item.name}</h2>

            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          <div>
            <p>Item price ₹{item.price}</p>

            <p>Item Total:{item.price * item.qty}</p>
          </div>
        </div>
      ))}




       {/* {cart.map(item => (
        <div key={item._id} className="flex justify-between border-b py-4">
           <img
              src={item.images?.[0]?.url}
              alt={item.name}
              className="h-[100px] rounded"
            />

            <h2 className="text-xl font-semibold">{item.name}</h2>

          <div>
           


            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          <div>
            <p>Item price ₹{item.price}</p>

            <p>Item Total:{item.price * item.qty}</p>
          </div>
        </div>
      ))} */}

      <div className="text-l font-semibold p-4">
        <div>Amount: {subTotal}</div>
        <div>Delivery Charges: {deliveryCharges}</div>
        <div>Tax: {taxRate}%</div>
      </div>
      <div className="flex flex-row p-10 gap-6 border-t-2">


        <div className="text-2xl font-bold ">
          Total: ₹{finalPrice}
        </div>
        <p className="text-green-600 mt-2">
  Discounts will be applied at checkout
</p>  
        {/* <button >Checkout</button> */}
        <button className="border p-2 rounded text-white  bg-emerald-700" onClick={() => navigate("/checkout")}>
          Checkout
        </button>

      </div>
    </div>
  )
}

export default CartPage