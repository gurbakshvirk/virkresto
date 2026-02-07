const AddToCartButton = ({ item }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  return (
    <button
      onClick={handleAddToCart}
      className="text-sm text-white rounded-full bg-yellow-400 px-6 py-3 font-bold hover:bg-green-500 hover:scale-105 transition"
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton
