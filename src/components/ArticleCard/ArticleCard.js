import React from 'react'
import Tag from '../UI/Tag'
import s from './ArticleCard.module.scss'

function ArticleCard({ article }) {
  return (
    <li className={s.card}>
      <div className={s.card__left}>
        <div className={s.card__header}>
          <h3>{article.title}</h3>
          <span>♥ {article.favoritesCount}</span>
        </div>
        {article.tagList && article.tagList.map((tag) => <Tag label={tag} />)}
        <span>{article.description}</span>
      </div>
      <div className={s.card__autor}>
        <span>{article.author.username}</span>
        <img className={s.card__img} src={article.author.image} alt="author" />
      </div>
    </li>
  )
}

// {
//   "slug": "string",
//   "title": "string",
//   "description": "string",
//   "body": "string",
//   "tagList": [
//   "string"
// ],
//   "createdAt": "2022-12-19T14:09:47.208Z",
//   "updatedAt": "2022-12-19T14:09:47.208Z",
//   "favorited": true,
//   "favoritesCount": 0,
//   "author": {
//   "username": "string",
//     "bio": "string",
//     "image": "string",
//     "following": true
// }
// }

export default ArticleCard
