import React from 'react'
import { Link } from 'react-router-dom'
import s from './CustomButton.module.scss.css'

function CustomButton({ to, children, ...props }) {
  if (to) {
    return (
      <Link to={to} className={s.btn}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={s.btn} {...props}>
      {children}
    </button>
  )
}

export default CustomButton
