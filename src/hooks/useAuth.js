import { useSelector } from 'react-redux'
import { setImage } from '../redux/slices/userSlice'

export function useAuth() {
  const { email, username, token, userImage } = useSelector((state) => state.userReducer)

  if (username) {
    const res = fetch('https://blog.kata.academy/api/profile/username')
    if (!res.ok) {
      return false
    }
    setImage()
  }

  return {
    isAuth: !!email,
    username,
    token,
    userImage,
  }
}
