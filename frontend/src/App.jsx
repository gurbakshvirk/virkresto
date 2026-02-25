import { useEffect } from "react"
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
// import AdminLayout from "./pages/admin/Dashboard";
import PublicLayout from "./pages/publiclayout";
import BookTable from "./pages/BookTable";




import Dashboard from './pages/admin/Dashboard';
import Adminproducts from "./pages/admin/Adminproducts";
// import Lenis from "@studio-freight/lenis"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
import AdminLayout from "./pages/adminlayout";
import Adminorders from "./pages/admin/Adminorders";
import Admincategories from "./pages/admin/Admincategories";
import Adminusers from "./pages/admin/Adminusers";
import Adminreservations from "./pages/admin/Adminreservations";
import Admincoupons from "./pages/admin/Admincoupons";
import Adminsettings from "./pages/admin/Adminsettings";
import SubCategories from "./pages/admin/subCategories";
import AdminLiveReservations from "./pages/admin/AdminLiveReservations";




// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


// gsap.registerPlugin(ScrollTrigger)
const App = () => {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.5,
  //     smooth: true,
  //     smoothTouch: false,
  //     easing: (t) => 1 - Math.pow(1 - t, 4),
  //   })
  //   function raf(time) {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }
  //   requestAnimationFrame(raf)
  //   lenis.on("scroll", ScrollTrigger.update)
  //   ScrollTrigger.scrollerProxy(document.body, {
  //     scrollTop(value) {
  //       return arguments.length
  //         ? lenis.scrollTo(value, { immediate: true })
  //         : window.scrollY
  //     },
  //     getBoundingClientRect() {
  //       return {
  //         top: 0,
  //         left: 0,
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       }
  //     },
  //   })
  //   ScrollTrigger.refresh()
  //   return () => lenis.destroy()
  // }, [])
const location = useLocation();


  return (
   <Routes location={location} key={location.pathname}>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        {/* <Route path="/menu/:id" element={<SingleProductPage />} /> */}
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/reservation" element={<BookTable />} />
      </Route>


      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Adminproducts" element={<Adminproducts />} />
        <Route path="Adminorders" element={<Adminorders />} />
        <Route path="Admincategories" element={<Admincategories />} />
        <Route path="Adminusers" element={<Adminusers />} />
        <Route path="Adminreservations" element={<Adminreservations />} />
        <Route path="Admincoupons" element={<Admincoupons />} />
        <Route path="Adminsettings" element={<Adminsettings />} />
        <Route path="subCategories" element={<SubCategories />} />
        <Route path="AdminLiveReservations" element={<AdminLiveReservations />} />
      </Route>
    </Routes>
  )
}
export default App
