import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <ul>
        <li>
          <Link to="/articles">Посты</Link>
        </li>
        <li>
          <Link to="/sign-up">Регистрация</Link>
        </li>
        <li>
          <Link to="/sign-in">Логин</Link>
        </li>
        <li>
          <Link to="/profile">Профиль</Link>
        </li>
        <li>
          <Link to="/newarticle">Добавить пост</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
