import React from 'react'
import Tag from '../UI/Tag'
import s from './ArticleCard.module.scss'
import Like from '../Like'
import User from '../UI/User/User'

function ArticleCard({ article }) {
  return (
    <li className={s.card}>
      <div className={s.card__left}>
        <div className={s.card__header}>
          <h3 className={s.card__title}>{article.title}</h3>
          <Like count={article.favoritesCount} />
        </div>
        <ul>
          {
            article.tagList &&
              article.tagList.map((tag, index) => {
                const tagTrim = tag.trim()
                if (tagTrim.length > 0 && tagTrim.length < 30) {
                  return <Tag key={index} label={tagTrim} />
                }
                return false
              })
            // (tag.trim().length > 0 < 30 ? <Tag key={index} label={tag} /> : null))
          }
        </ul>
        <span>{article.description}</span>
      </div>
      <User username={article.author.username} createDate={article.createdAt} image={article.author.image} />
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
