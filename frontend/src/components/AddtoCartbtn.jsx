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
      className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-white font-semibold"
    >
      Add to Cart
    </button>
  )
}

export default AddToCartButton
