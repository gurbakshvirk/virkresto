import AddToCartButton from './AddtoCartbtn'
import { Link } from 'react-router-dom'


const MenuPageCard = ({ items }) => {
  console.log(items)
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10 text-white">Our Menu</h1>
      <div className="grid grid-cols-3 gap-6">
        {items.map((items) => (
          <div key={items.id} className="bg-white text-black p-4 rounded-xl">
            <img src={items.image} className="h-40 mx-auto" />
            <h2 className="font-bold mt-4">{items.title}</h2>
            <p className="text-sm">₹ {items.price}</p>
            <div className="flex gap-3 mt-4">
              <Link to={`/menu/${items.id}`}>
                <button className="px-3 py-1 bg-black text-white rounded">
                  View
                </button>
              </Link>
              <AddToCartButton item={items} />

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPageCard
