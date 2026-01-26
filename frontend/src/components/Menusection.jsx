import { getAllProducts } from '../services/productservice'
// import MenuCard from './MenuCard'
import MenuPageCard from './MenuPageCard'


const MenuSection = () => {
    const menuItems = getAllProducts()


    console.log(menuItems)

    return (
        <section className="py-24 bg-gradient-to-r from-gray-800 via-white to-gray-400 ">

            {/* Heading */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Our Menu
                </h2>
                <p className="mt-4 text-black">
                    Explore our most loved dishes
                </p>
            </div>

            {/* Scrollable Cards */}
            <div className="flex gap-10 overflow-x-auto px-6 md:px-20 snap-x snap-mandatory ">
                {/* <div className="snap-start">
          <MenuCard />
        </div>
        <div className="snap-start">
          <MenuCard />
        </div>
        <div className="snap-start">
          <MenuCard />
        </div>
        <div className="snap-start">
          <MenuCard />
        </div>
        <div className="snap-start">
          <MenuCard />
        </div> */}
                <div className="flex gap-10 overflow-x-auto px-6 md:px-20 snap-x snap-mandatory">
                    {menuItems.map((item) => (
                        <div key={item.id} className="snap-start">
                            <MenuPageCard title={item.title} image={item.image} id={item.id} />
                            {/* <MenuPageCard */}
                        </div>
                    ))}
                </div>

            </div>

        </section>
    )
}

export default MenuSection
