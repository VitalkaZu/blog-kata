import React from 'react'
import { Button } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import s from './Header.module.scss'

function Header() {
  return (
    <>
      <div className={s.header}>
        <span className={s.header__title}>Realworld Blog</span>
        <div className={s.header__right}>
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
