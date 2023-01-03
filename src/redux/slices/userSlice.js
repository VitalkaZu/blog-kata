import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { blogApi } from '../blogApi'

const initialState = {
  user: {},
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
      // state.token = action.payload.user.token
      localStorage.setItem('user', action.payload.user)
    },
    clearUser(state) {
      state.user = {}
      // state.token = null
      localStorage.clear()
    },
    // setToken(state, action) {
    //   state.token = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        blogApi.endpoints.loginUser.matchFulfilled,
        blogApi.endpoints.updateUser.matchFulfilled,
        blogApi.endpoints.getProfile.matchFulfilled
      ),
      (state, { payload }) => {
        state.user = payload.user
        localStorage.setItem('token', payload.user.token)
        // state.token = payload.token
        // state.user = payload.user
      }
    )
  },
})

export const { setUser, clearUser, setToken } = userSlice.actions

export default userSlice.reducer
