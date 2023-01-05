import React from 'react'
import classNames from 'classnames'
import s from './Like.module.scss'

function Like({ count, favorited, handleLike, disable }) {
  return (
    <button
      type="button"
      className={classNames(s.like, { [s.favorited]: favorited })}
      onClick={handleLike}
      disabled={disable}
    >
      {count}
    </button>
  )
}

export default Like
