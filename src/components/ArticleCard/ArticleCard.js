import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import Tag from '../UI/Tag'
import s from './ArticleCard.module.scss'
import Like from '../Like'
import User from '../UI/User/User'
// import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../redux'
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../../redux'

function ArticleCard({ article, markDown, onClick }) {
  const [like] = useFavoriteArticleMutation()
  const [dislike] = useUnFavoriteArticleMutation()

  const handleLike = async (slug) => {
    if (article.favorited) {
      await dislike(slug)
      console.log('dislike', slug)
    } else {
      await like(slug)
      console.log('like', slug)
    }
  }

  return (
    <li className={`${s.card} wrapper`}>
      <div className={s.card__left}>
        <div className={s.card__header}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={`/articles/${article.slug}`} className={s.card__title} onClick={onClick}>
            {article.title}
          </Link>
          <Like
            count={article.favoritesCount}
            favorited={article.favorited}
            handleLike={() => handleLike(article.slug)}
          />
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
      <div className={s.card__right}>
        <User username={article.author.username} createDate={article.createdAt} image={article.author.image} />
        <div>
          <button type="button">Delete</button>
          <button type="button">Edit</button>
        </div>
      </div>
      {markDown && (
        <div className={s.card__markdown}>
          <Markdown>{markDown}</Markdown>
        </div>
      )}
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
