import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './Header.module.scss'
import User from '../UI/User/User'
import { useAuth } from '../../hooks/useAuth'
import { clearUser } from '../../redux/slices/userSlice'
// import { setImage } from '../../redux/slices/userSlice'

function Header() {
  // const { username, image } = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()
  const { isAuth, username, image } = useAuth()
  // const [data] = useGetProfileQuery(username)
  // const { isAuth, username } = useAuth()

  // useEffect(() => {
  //   if (username) {
  //     console.log(data)
  //   }
  // }, [username])
  const handlerLogOut = () => {
    dispatch(clearUser())
  }

  return (
    <>
      <div className={s.header}>
        <Link to="/" className={s.header__title}>Realworld Blog</Link>
        <div className={s.header__right}>
          {isAuth ? (
            <>
              <User username={username} image={image} />
              {/* <Link onClick={handlerLogOut}>LogOut</Link> */}
              <button type="button" onClick={handlerLogOut}>LogOut</button>
            </>
          ) : (
            <>
              <Link to="/sign-up">SignUp</Link>
              <Link to="/sign-in">SignIn</Link>
            </>
          )}
          {/* // <Button type="text">Sign In</Button> */}
          {/* // <Button>Sign Up</Button> */}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
