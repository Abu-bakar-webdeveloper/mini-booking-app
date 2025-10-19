import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bookingAPI } from '../../utils/api'

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.create(bookingData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking')
    }
  }
)

export const getBookings = createAsyncThunk(
  'bookings/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings')
    }
  }
)

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.updateStatus(id, status)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking')
    }
  }
)

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false
        state.bookings.push(action.payload.data)
        state.error = null
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getBookings.pending, (state) => {
        state.loading = true
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload.data
        state.error = null
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updatedBooking = action.payload.data
        const index = state.bookings.findIndex(booking => booking._id === updatedBooking._id)
        if (index !== -1) {
          state.bookings[index] = updatedBooking
        }
        state.error = null
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearBookingError } = bookingSlice.actions
export default bookingSlice.reducer