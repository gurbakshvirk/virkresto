import { Navigate, NavLink, Outlet } from "react-router-dom"
import {
  LayoutDashboard, ClipboardList, UtensilsCrossed,
  Folder, Users, CalendarDays, Ticket, Settings, LogOut
} from "lucide-react"
import { useAuth } from "../context/authcontext"

const AdminLayout = () => {

  const { user, isLoggedIn, logout } = useAuth()

  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/" />
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition    ${isActive
      ? "bg-orange-500 text-white"
      : "text-gray-600 hover:bg-gray-200"
    }`

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed bg-white shadow-lg flex flex-col justify-between p-5">
        <div>
          <h1 className="text-2xl font-bold text-orange-500 mb-8">
            Virkresto Admin
          </h1>
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className={linkClass}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/admin/subCategories" className={linkClass}>
              <LayoutDashboard size={20} />VEG or NON-VEG
            </NavLink>
            <NavLink to="/admin/Adminproducts" className={linkClass}>
              <UtensilsCrossed size={20} /> Products
            </NavLink>
            <NavLink to="/admin/Adminorders" className={linkClass}>
              <ClipboardList size={20} /> Orders
            </NavLink>
            {/* <NavLink to="/admin/menu" className={linkClass}>
              <UtensilsCrossed size={20} /> Menu
            </NavLink> */}
            <NavLink to="/admin/Admincategories" className={linkClass}>
              <Folder size={20} /> Categories
            </NavLink>
            <NavLink to="/admin/Adminusers" className={linkClass}>
              <Users size={20} /> Users
            </NavLink>
            <NavLink to="/admin/Adminreservations" className={linkClass}>
              <CalendarDays size={20} /> Reservations
            </NavLink>
            <NavLink to="/admin/Admincoupons" className={linkClass}>
              <Ticket size={20} /> Coupons
            </NavLink>
            <NavLink to="/admin/Adminsettings" className={linkClass}>
              <Settings size={20} /> Settings
            </NavLink>
          </nav>
        </div>

        <button onClick={logout} className="flex items-center gap-3 text-red-500 hover:bg-red-100 px-4 py-3 rounded-lg transition">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Section */}
      <div className="ml-64 w-full min-h-screen bg-gray-100">

        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="bg-yellow-300 border-2 rounded-lg hover:bg-yellow-400 hover:scale-105">
            <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg transition" >
              <LayoutDashboard size={20} /> <p className="text-black">Go to Site</p>
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full border-2 border-orange-800">
              {/* <span className="px-3 py-2 text-white"> */}
              {user?.username || "Admin"}
              {/* </span> */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />

        </main>
      </div>
    </div>
  )
}

export default AdminLayout

