import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/slices/authSlice'
import { showError } from '../../utils/toast'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/login')
    } catch (error) {
      showError(error?.message || 'Logout failed')
    }
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            ServiceBooking
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>

          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-start md:items-center gap-4 absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 md:right-auto w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none z-50`}
          >
            <span className="text-gray-700 text-sm md:text-base">Welcome, {user?.name}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs md:text-sm">{user?.role}</span>

            {user?.role === "user" && (
              <Link
                to="/bookings/new"
                onClick={handleMenuClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base w-full md:w-auto text-center"
              >
                New Booking
              </Link>
            )}

            <Link
              to="/bookings"
              onClick={handleMenuClose}
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
            >
              Bookings
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={handleMenuClose}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={() => {
                handleLogout()
                handleMenuClose()
              }}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base w-full md:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar