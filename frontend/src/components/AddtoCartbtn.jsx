// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'


// const AddToCartButton = ({ item }) => {
//     const handleAddToCart = () => {
//       const cart = JSON.parse(localStorage.getItem('cart') || '[]')



//       const existingItem = cart.find((i) => i.id === item._id)

//       if (existingItem) {
//         existingItem.quantity += 1
//         toast.success('Cart Updated successfully')


//       } else {
//         cart.push({ 

//            id: item._id,
//         name: item.name,
//         price: item.price,
//         image: item.images?.[0]?.url,
//         quantity: 1,
//          })
//         toast.success('Added to Cart successfully')

         

//       }
//       localStorage.setItem('cart', JSON.stringify(cart))
//     }
//     return (
//       <button
//         onClick={handleAddToCart}
//         className="text-sm bg-orange-500 hover:bg-orange-600 text-white  px-6 py-3 rounded-full font-semibold transition-all"
//         // text-white rounded-full bg-yellow-400 py-3 font-bold hover:bg-green-500 hover:scale-105 transition"
//         // mt-2 
//       >
//         Add to Cart
//       </button>
//     )
//   }

//   export default AddToCartButton


import { useContext } from "react"
import { CartContext } from "../context/CartContext"

const AddToCartButton = ({ item }) => {

  
  const { cart , addToCart , increaseQty,removeItem, decreaseQty, clearCart } = useContext(CartContext);

  return (
    <button
      onClick={() => addToCart(item)}
      className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton