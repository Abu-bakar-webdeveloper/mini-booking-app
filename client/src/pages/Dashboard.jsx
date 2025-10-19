import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'admin':
        return 'Manage users and oversee all bookings'
      case 'manager':
        return 'Review and manage booking requests'
      case 'user':
        return 'Book and track your vehicle services'
      default:
        return 'Welcome to Service Booking Platform'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {getWelcomeMessage()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.role === 'user' && (
          <Link
            to="/bookings/new"
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">Create Booking</h3>
            <p className="text-gray-600 mt-2">Book a new vehicle service</p>
          </Link>
        )}
        
        <Link
          to="/bookings"
          className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {user.role === 'user' ? 'My Bookings' : 'All Bookings'}
          </h3>
          <p className="text-gray-600 mt-2">
            {user.role === 'user' ? 'View your service requests' : 'Manage all bookings'}
          </p>
        </Link>

        {user.role === 'admin' && (
          <Link
            to="/admin"
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
            <p className="text-gray-600 mt-2">Manage users and managers</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Dashboard