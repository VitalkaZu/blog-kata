import React, { useEffect } from 'react'
import { Button } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import s from './Header.module.scss'
import User from '../UI/User/User'
import { useGetProfileQuery } from '../../redux'
// import { setImage } from '../../redux/slices/userSlice'

function Header() {
  const { username } = useSelector((state) => state.userReducer)

  useEffect(() => {
    if (username) {
      const [data] = useGetProfileQuery(username)
      console.log(data)
    }
  }, [username])

  return (
    <>
      <div className={s.header}>
        <span className={s.header__title}>Realworld Blog</span>
        <div className={s.header__right}>
          {username ? <User username={username} /> : null}
          <Button type="text">Sign In</Button>
          <Button>Sign Up</Button>
          <Link to="/signup">Text</Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
