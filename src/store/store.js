import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reduxSlice/counterItemSlice'

export const store = configureStore({
  reducer: {
    counterItem: counterReducer,
  },
})