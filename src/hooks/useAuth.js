import { useSelector } from 'react-redux'
// import { setImage } from '../redux/slices/userSlice'

export function useAuth() {
  const { email, username, token, image } = useSelector((state) => state.userSlice.user)

  return {
    isAuth: !!email,
    username,
    token,
    image,
  }
}
