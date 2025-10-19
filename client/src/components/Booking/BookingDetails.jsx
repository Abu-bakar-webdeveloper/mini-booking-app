import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBookingStatus } from '../../store/slices/bookingSlice'
import { showError } from '../../utils/toast'

const BookingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { bookings } = useSelector((state) => state.bookings)
  const { user } = useSelector((state) => state.auth)
  
  const [booking, setBooking] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const foundBooking = bookings.find(b => b._id === id)
    if (foundBooking) {
      setBooking(foundBooking)
      setStatus(foundBooking.status)
    }
  }, [id, bookings])

  const handleStatusUpdate = async () => {
    if (status && status !== booking.status) {
      try {
        await dispatch(updateBookingStatus({ id: booking._id, status })).unwrap()
        // Status will be updated in Redux store, which will trigger re-render
      } catch (error) {
        showError(error?.message || 'Failed to update status')
      }
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  const canUpdateStatus = user.role === 'manager' || user.role === 'admin'
  const isOwner = user.role === 'user' && booking.user === user.id

  if (!isOwner && !canUpdateStatus && user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to view this booking.</p>
          <button
            onClick={() => navigate('/bookings')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
            <p className="text-gray-600">Booking ID: {booking._id}</p>
          </div>
          <button
            onClick={() => navigate('/bookings')}
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Service Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{booking.vehicleType}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{booking.serviceType}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Date & Time</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(booking.preferredDate).toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="mt-1 text-sm text-gray-900">{booking.location}</p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Status & Management</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Status</label>
              <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Created</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Updated</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(booking.updatedAt).toLocaleString()}
              </p>
            </div>

            {/* Status Update (for managers/admins) */}
            {canUpdateStatus && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <div className="flex space-x-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={status === booking.status}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Issue Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Description
          </label>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{booking.issueDescription}</p>
          </div>
        </div>

        {/* Manager Notes (if any) */}
        {booking.managerNotes && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager Notes
            </label>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{booking.managerNotes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingDetails