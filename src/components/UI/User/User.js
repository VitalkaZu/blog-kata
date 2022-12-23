import React from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import s from './User.module.scss'

function User({ username, image, createDate }) {
  const date = new Date(createDate)
  return (
    <div className={s.user}>
      <div className={s.user__info}>
        <span className={s.user__username}>{username}</span>
        {createDate ? <span className={s.user__date}>{format(date, 'MMMM d, yyyy')}</span> : null}
      </div>
      <img className={s.user__img} alt="Avatar" src={image} />
    </div>
  )
}

User.defaultProps = {
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  createDate: null,
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
  createDate: PropTypes.string,
}

export default User
