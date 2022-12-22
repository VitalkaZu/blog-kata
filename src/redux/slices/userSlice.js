import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  username: null,
  token: null,
  userImage: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, username, token } = action.payload
      state.email = email
      state.username = username
      state.token = token
    },
    clearUser(state) {
      state.email = null
      state.username = null
      state.token = null
      state.userImage = null
    },
    setImage(state, action) {
      const { image } = action.payload
      state.userImage = image
    }
  },
})

export const { setUser, clearUser, setImage } = userSlice.actions

export default userSlice.reducer
