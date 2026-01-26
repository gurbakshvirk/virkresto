import MenuPageCard from '../components/MenuPageCard'
import { getAllProducts } from '../services/productservice'
const Menu = async () => {
 const menuItems = await getAllProducts()
  return(
<>
  <MenuPageCard items={menuItems} />  
</>
  )
}
export default Menu


