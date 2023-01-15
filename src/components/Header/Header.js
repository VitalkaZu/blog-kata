import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './Header.module.scss'
import User from '../UI/User/User'
import { useAuth } from '../../hooks/useAuth'
import { clearUser } from '../../redux/slices/userSlice'
import { blogApi } from '../../redux'

function Header() {
  const dispatch = useDispatch()
  const { isAuth, username, image } = useAuth()
  const handlerLogOut = () => {
    dispatch(clearUser())
    dispatch(blogApi.util.invalidateTags(['Article']))
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
              <Link to="/new-article" className="newArticleBtn">
                Create article
              </Link>
              <Link to="/profile" className="userBtn">
                <User username={username} image={image} />
              </Link>
              <button type="button" className="logoutBtn" onClick={handlerLogOut}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="signInBtn">
                SignIn
              </Link>
              <Link to="/sign-up" className="signUpBtn">
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={s.main}>
        <Outlet />
      </div>
    </>
  )
}

export default Header
