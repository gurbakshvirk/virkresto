import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import Menu from './pages/MenuPage';
import Signup from './pages/Sign-up';
import CartPage from './pages/CartPage';
import Pagenotfound from './pages/Pagenotfound';
import SingleProductPage from './pages/Singleproduct';
import Login from './pages/login';


const App = () => {
  return (
    <BrowserRouter>
    <div className='bg-red-300'>
      <Navbar /> 
      <div className='mt-30'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<CartPage/>} />

        <Route path="*" element={<Pagenotfound />} />
        {/* <Route path={`/menu/${items.id}`} element={<SingleProductPage/>} /> */}
         <Route path="/menu/:id" element={<SingleProductPage />} />






        

      </Routes>

      </div>
      <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
