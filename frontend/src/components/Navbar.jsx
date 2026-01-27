import { NavLink } from 'react-router-dom'; // Changed to NavLink
import { useState } from "react"

const Navbar = () => {
    const [open, setOpen] = useState(false)

    // Helper to keep code clean - common classes for desktop links
    const desktopLinkClass = ({ isActive }) => `px-4 py-2 border-2 rounded-2xl transition ${isActive ? "border-white/50 bg-white/1" : "border-transparent hover:border-white"}`;

    return (    
        <nav className="absolute inset-x-0 top-0 z-50 py-8">
            <div className="mx-5 md:mx-14 bg-black/70 border-2 border-white p-5 rounded-bl-4xl rounded-tr-4xl">
                <div className="flex items-center justify-between md:px-10">

                    {/* Logo */}
                    <div className="text-3xl md:text-4xl font-bold text-white">
                        DeliEat
                    </div>

                    <div className="hidden md:flex space-x-6 font-black text-white">
                        {/* Changed href to to */}
                        <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
                        <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
                        <NavLink to="/reservation" className={desktopLinkClass}>Reservations</NavLink>
                        <NavLink to="/orderonline" className={desktopLinkClass}>Order Online</NavLink>
                        <NavLink to="/contact" className={desktopLinkClass}>Contact</NavLink>
                        <NavLink to="/menu" className={desktopLinkClass}>Menu</NavLink>
                        <NavLink to="/cart" className={desktopLinkClass}>Cart</NavLink>
                        <NavLink to="/sign-up" className={desktopLinkClass}>Sign-up</NavLink>
                        <NavLink to="/login" className={desktopLinkClass}>Login</NavLink>

                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-white text-3xl"
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="md:hidden flex flex-col items-center gap-6 mt-6 font-bold text-white">
                        {/* Changed href to to */}
                        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
                        <NavLink to="/reservation" onClick={() => setOpen(false)}>Reservations</NavLink>
                        <NavLink to="/orderonline" onClick={() => setOpen(false)}>Order Online</NavLink>
                        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
