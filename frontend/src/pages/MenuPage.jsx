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

  return <MenuPageCard items={menuItems} />
}

export default Menu
