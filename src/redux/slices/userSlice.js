import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  username: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authUser(state, action) {
      const { email, username, token } = action.payload
      state.email = email
      state.username = username
      state.token = token
    },
    logout(state) {
      state.email = null
      state.username = null
      state.token = null
    },
  },
})

export const { authUser, logout } = userSlice.actions

export default userSlice.reducer
