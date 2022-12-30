import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './Header.module.scss'
import User from '../UI/User/User'
import { useAuth } from '../../hooks/useAuth'
import { clearUser } from '../../redux/slices/userSlice'
// import CustomButton from '../UI/CustomButton'
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
        <Link to="/" className="logoLink">
          Realworld Blog
        </Link>
        <div className={s.header__right}>
          {isAuth ? (
            <>
              {/* <CustomButton to="/profile"> */}
              {/*  <User username={username} image={image} /> */}
              {/* </CustomButton> */}
              <Link to="/new-article" className="newArticleBtn">Create article</Link>
              <Link to="/profile" className="userBtn">
                <User username={username} image={image} />
              </Link>
              {/* <Link onClick={handlerLogOut}>LogOut</Link> */}
              <button type="button" className="logoutBtn" onClick={handlerLogOut}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="signInBtn">SignIn</Link>
              <Link to="/sign-up" className="signUpBtn">
                SignUp
              </Link>
            </>
          )}
          {/* // <CustomButton type="text">Sign In</CustomButton> */}
          {/* // <CustomButton>Sign Up</CustomButton> */}
        </div>
      </div>
      <div className={s.main}>
        <Outlet />
      </div>
    </>
  )
}

export default Header
