import { useEffect, useState } from 'react'
import MenuPageCard from '../components/MenuPageCard'
import { getAllProducts } from '../services/productservice'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setMenuItems(data)
        } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p className="text-white p-10">Loading menu...</p>






  return (
    <div className="p-5 pt-32 flex flex-wrap gap-5 justify-center bg-linear-to-r from-yellow-300 via-yellow-200 to-gray-100 overflow-hidden ">
      {menuItems.map((item) => (
        <MenuPageCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Menu
