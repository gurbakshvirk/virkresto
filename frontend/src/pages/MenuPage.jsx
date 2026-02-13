import { useEffect, useState } from "react"
import MenuPageCard from "../components/MenuPageCard"
import { getAllProducts, fetchCategories } from "../services/productservice"

const Menu = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null) // null = show all
  const [foodFilter, setFoodFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getAllProducts(),
          fetchCategories()
        ])

        setProducts(productData)
        setCategories(categoryData)
      } catch (err) {
        console.error("Menu Load Error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <p className="p-10 text-center">Loading menu...</p>

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredProducts = products.filter(product => {
    // Handle both populated and non-populated category
    const categoryObj =
      typeof product.category === "object" ? product.category : null

    const productCategoryId = categoryObj?._id || product.category
    const productFoodType = categoryObj?.foodType || null

    // CATEGORY FILTER (apply only if selected)
    const matchCategory =
      !activeCategory || productCategoryId === activeCategory

    // FOOD FILTER (global)
    const matchFood =
      foodFilter === "all" ||
      productFoodType === foodFilter ||
      productFoodType === "both"

    return matchCategory && matchFood
  })
  return (
    <div className="pt-38 pb-20 bg-[#f7f4ef] min-h-screen">

      {/* Heading */}
      <h1 className="text-4xl font-serif text-center mb-10">
        Dive Into Delicious Meals
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-5 flex-wrap mb-5">

        {/* ALL BUTTON */}
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-6 py-2 rounded-full border transition
            ${activeCategory === null
              ? "bg-green-700 text-white"
              : "bg-white hover:bg-green-100"
            }`}
        >
          All
        </button>

        {/* Dynamic Categories */}
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() =>
              setActiveCategory(prev =>
                prev === cat._id ? null : cat._id
              )
            }
            className={`px-6 py-2 rounded-full border transition
              ${activeCategory === cat._id
                ? "bg-green-700 text-white"
                : "bg-white hover:bg-green-100"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Veg / Non-Veg Toggle */}
      <div className="flex justify-center gap-4 mb-12">
        {["all", "veg", "nonveg"].map(type => (
          <button
            key={type}
            onClick={() => setFoodFilter(type)}
            className={`px-5 py-2 rounded-full capitalize border transition
              ${foodFilter === type
                ? "bg-green-700 text-white"
                : "bg-white hover:bg-green-100"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="max-w-5xl mx-auto space-y-6 px-5">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No items available.</p>
        ) : (
          filteredProducts.map(item => (
            <MenuPageCard key={item._id} image={item.images} item={item} />
          ))
        )}
      </div>

    </div>
  )
}

export default Menu
