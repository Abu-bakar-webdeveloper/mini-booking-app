import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser,
  clearError 
} from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const login = useCallback((credentials) => {
    return dispatch(loginUser(credentials))
  }, [dispatch])

  const register = useCallback((userData) => {
    return dispatch(registerUser(userData))
  }, [dispatch])

  const logout = useCallback(() => {
    return dispatch(logoutUser())
  }, [dispatch])

  const getMe = useCallback(() => {
    return dispatch(getCurrentUser())
  }, [dispatch])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    getMe,
    clearError: clearAuthError,
  }
}