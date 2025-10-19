import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, createManager, deleteManager } from '../store/slices/userSlice'
import { showError, showSuccess } from '../utils/toast'

const AdminPanel = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [managerData, setManagerData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.users)
  const { user: currentUser } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleCreateManager = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createManager(managerData)).unwrap()
      showSuccess('Manager created successfully!')
      setManagerData({ name: '', email: '', password: '' })
      setShowCreateForm(false)
    } catch (error) {
      showError(error?.message || 'Failed to create manager')
    }
  }

  const handleDeleteManager = async (managerId) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      try {
        await dispatch(deleteManager(managerId)).unwrap()
        showSuccess('Manager deleted successfully!')
      } catch (error) {
        showError(error?.message || 'Failed to delete manager')
      }
    }
  }

  const managers = users.filter(user => user.role === 'manager')
  const regularUsers = users.filter(user => user.role === 'user')

  console.log(managers, "managers");

  return (
    <div className="max-w-6xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>

      {/* Manager Management */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Manager Accounts</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Manager
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateManager} className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-900 mb-3">Create New Manager</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Name"
                value={managerData.name}
                onChange={(e) => setManagerData({...managerData, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={managerData.email}
                onChange={(e) => setManagerData({...managerData, email: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={managerData.password}
                onChange={(e) => setManagerData({...managerData, password: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {managers.map((manager) => (
                  <tr key={manager._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {manager.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {manager.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {manager.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {manager._id !== currentUser.id && (
                        <button
                          onClick={() => handleDeleteManager(manager._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {managers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No manager accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Users */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Users</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regularUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel