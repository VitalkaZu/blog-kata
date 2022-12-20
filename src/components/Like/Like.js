import React from 'react'
import s from './Like.module.scss'

function Like({ count }) {
  return <span className={s.like}>{count}</span>
}

export default Like
