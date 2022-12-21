import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './blogApi'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
