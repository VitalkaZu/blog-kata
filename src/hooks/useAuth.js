import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { setToken, setUser } from '../redux/slices/userSlice'
// import { useGetProfileQuery } from '../redux/blogApi'

// import { setImage } from '../redux/slices/userSlice'

export function useAuth() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const { getProfile } = useGetProfileQuery()
  const { email, username, token, image } = useSelector((state) => state.userSlice.user)

  // const autoLogin = async () => {
  //   await dispatch(setToken(localStorage.getItem(token)))
  //   try {
  //     const user = await getProfile()
  //     dispatch(setUser(user))
  //   } catch (e) {
  //     console.log(e)
  //     navigate('/sign-in')
  //   }
  // }
  //
  // if (!username && localStorage.getItem('token')) {
  //   console.log('token in localstorage >>>>', localStorage.getItem('token'))
  //   // autoLogin()
  // }

  //   // (async () => {
  //   //   await dispatch(setToken(localStorage.getItem(token)))
  //   //   try {
  //   //     const user = await getProfile()
  //   //     dispatch(setUser(user))
  //   //   } catch (e) {
  //   //     console.log(e)
  //   //     navigate('/sign-in')
  //   //   }
  //   // })()
  // }
  // let emailLocal
  // let usernameLocal
  // let tokenLocal
  // let imageLocal
  //
  // if (localStorage.getItem('user')) {
  //   { email: emailLocal, usernameLocal, tokenLocal, imageLocal } = JSON.parse(localStorage.getItem('user'))
  // }

  return {
    isAuth: !!username,
    email,
    username,
    token,
    image,
  }
  // return {
  //   isAuth: !!username || !!usernameLocal,
  //   email: email || emailLocal,
  //   username: username || usernameLocal,
  //   token: token || tokenLocal,
  //   image: image || imageLocal,
  // }
}
