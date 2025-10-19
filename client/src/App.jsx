import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './store/slices/authSlice'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import BookingList from './components/Booking/BookingList'
import BookingForm from './components/Booking/BookingForm'
import BookingDetails from './components/Booking/BookingDetails'
import Navbar from './components/Layout/Navbar'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

const AppContent = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // Only call getCurrentUser if user is not already loaded and not currently loading
    if (!user && !loading) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, user, loading])

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <BookingList />
          </ProtectedRoute>
        } />
        <Route path="/bookings/new" element={
          <ProtectedRoute allowedRoles={['user']}>
            <BookingForm />
          </ProtectedRoute>
        } />
        <Route path="/bookings/:id" element={
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App