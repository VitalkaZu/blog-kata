import React from 'react'
import classNames from 'classnames'
import s from './Like.module.scss'

function Like({ count, favorited, handleLike }) {
  // const handleLike = () => {
  //   console.log('like')
  // }
  return (
    <button type="button" className={classNames(s.like, { [s.favorited]: favorited })} onClick={handleLike}>
      {count}
    </button>
  )
}

export default Like
