import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../../utils/api'

export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users')
    }
  }
)

export const createManager = createAsyncThunk(
  'users/createManager',
  async (managerData, { rejectWithValue }) => {
    try {
      const response = await userAPI.createManager(managerData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create manager')
    }
  }
)

export const deleteManager = createAsyncThunk(
  'users/deleteManager',
  async (id, { rejectWithValue }) => {
    try {
      await userAPI.deleteManager(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete manager')
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.data
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createManager.fulfilled, (state, action) => {
        state.users.push(action.payload.data)
        state.error = null
      })
      .addCase(createManager.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload)
        state.error = null
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearUserError } = userSlice.actions
export default userSlice.reducer