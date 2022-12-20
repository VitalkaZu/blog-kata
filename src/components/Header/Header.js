import React from 'react'
import { Button } from 'antd'
import s from './Header.module.scss'

function Header() {
  return (
    <div className={s.header}>
      <span className={s.header__title}>Realworld Blog</span>
      <div className={s.header__right}>
        <Button type="text">Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}

export default Header
