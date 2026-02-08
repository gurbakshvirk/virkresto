import Hero from '../components/Hero'
import PopularSection from '../components/Popularsection'
import MenuSection from '../components/Menusection'
import BookTablesec from '../components/BookTableSec'
import OurChefs from '../components/OurChefs'
import ReviewSec from '../components/Reviewsec'
import CategorySection from '../components/CategorySection'

const Homepage = () => {
  return (
    <div>
      <Hero/>

      <PopularSection/>

      <BookTablesec/>

      <CategorySection/>

      <MenuSection/>

      <OurChefs/>
      
      <ReviewSec/>
    </div>
  )
}
export default Homepage
