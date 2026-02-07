import { useEffect, useState } from "react"
import { getAllProducts } from "../services/productservice"
import MenuPageCard from "./MenuPageCard"

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setMenuItems(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-12 md:h-screen bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 border-b-2 border-yellow-300">
      <div className=" text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Our Categories</h2>
        <div className='border-2 border-white w-24 mx-auto mt-4'></div>
        <p className="mt-2 text-black">Explore our most loved dishes</p>
      </div>

      <div className="flex gap-10 overflow-x-auto md:px-20 snap-x snap-mandatory p-5 mx-7">
        {menuItems.map((item) => (
          <div key={item.id} className="snap-start">
            <MenuPageCard
            //   title={item.title}
            //   image={item.image}
            //   id={item.id}
            item={item}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuSection
