import { NavLink } from 'react-router-dom'
import { useState } from "react"
import { useAuth } from "../context/authcontext"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, isLoggedIn, logout } = useAuth()

    // Common desktop link styles
    const desktopLinkClass = ({ isActive }) =>
        `px-4 py-2 border-2 rounded-2xl transition ${
            isActive
                ? "border-white/50 bg-white/10"
                : "border-transparent hover:border-white"
        }`

    return (
        <nav className="absolute inset-x-0 top-0 z-50 py-8">
            <div className="mx-5 md:mx-14 bg-black/70 border-2 border-white p-5 rounded-bl-4xl rounded-tr-4xl">
                <div className="flex items-center justify-between md:px-10">

                    {/* Logo */}
                    <div className="text-3xl md:text-4xl font-bold text-white">
                        DeliEat
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 font-black text-white">
                        <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
                        <NavLink to="/about" className={desktopLinkClass}>About</NavLink>
                        <NavLink to="/reservation" className={desktopLinkClass}>Reservations</NavLink>
                        <NavLink to="/orderonline" className={desktopLinkClass}>Order Online</NavLink>
                        <NavLink to="/contact" className={desktopLinkClass}>Contact</NavLink>
                        <NavLink to="/menu" className={desktopLinkClass}>Menu</NavLink>
                        <NavLink to="/cart" className={desktopLinkClass}>Cart</NavLink>

                        {/* NOT LOGGED IN */}
                        {!isLoggedIn && (
                            <>
                                <NavLink to="/sign-up" className={desktopLinkClass}>Sign-up</NavLink>
                                <NavLink to="/login" className={desktopLinkClass}>Login</NavLink>
                            </>
                        )}

                        {/* LOGGED IN */}
                        {isLoggedIn && (
                            <>
                                <span className="px-3 py-2 text-white">
                                    {user.username}
                                </span>

                                {user.role === "admin" && (
                                    <NavLink to="/admin" className={desktopLinkClass}>
                                        Admin
                                    </NavLink>
                                )}

                                <button
                                    onClick={logout}
                                    className="px-4 py-2 border-2 rounded-2xl hover:bg-white/10 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
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
                        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
                        <NavLink to="/reservation" onClick={() => setOpen(false)}>Reservations</NavLink>
                        <NavLink to="/orderonline" onClick={() => setOpen(false)}>Order Online</NavLink>
                        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                        <NavLink to="/menu" onClick={() => setOpen(false)}>Menu</NavLink>
                        <NavLink to="/cart" onClick={() => setOpen(false)}>Cart</NavLink>

                        {!isLoggedIn && (
                            <>
                                <NavLink to="/sign-up" onClick={() => setOpen(false)}>Sign-up</NavLink>
                                <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                <span>{user.username}</span>

                                {user.role === "admin" && (
                                    <NavLink to="/admin" onClick={() => setOpen(false)}>
                                        Admin
                                    </NavLink>
                                )}

                                <button
                                    onClick={() => {
                                        logout()
                                        setOpen(false)
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
