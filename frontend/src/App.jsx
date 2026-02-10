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



import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ReactLenis } from 'lenis/react'
gsap.registerPlugin(ScrollTrigger)


const App = () => {
  // const lenisRef = useRef()
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    smoothTouch: false,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  lenis.on("scroll", ScrollTrigger.update)

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value, { immediate: true })
        : window.scrollY
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  ScrollTrigger.refresh()

  return () => lenis.destroy()
}, [])












  return (
    // <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    <>
    <div className=''>
      <Navbar /> 
      <div className=''>
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
    </>
  )
}

export default App
