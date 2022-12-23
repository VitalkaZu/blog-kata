import { useSelector } from 'react-redux'
// import { setImage } from '../redux/slices/userSlice'

export function useAuth() {
  const { email, username, token, userImage } = useSelector((state) => state.userReducer.user)

  return {
    isAuth: !!email,
    username,
    token,
    userImage,
  }
}
