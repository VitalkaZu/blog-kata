import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { message, Popconfirm } from 'antd'
import s from './ArticleCard.module.scss'
import TagList from '../TagList/TagList'
import Like from '../Like'
import User from '../UI/User/User'
import { useAuth } from '../../hooks/useAuth'
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation, useDeleteArticleMutation } from '../../redux'

function ArticleCard({ article, markDown }) {
  const { slug: currentSlug } = useParams()
  const [like] = useFavoriteArticleMutation()
  const [dislike] = useUnFavoriteArticleMutation()
  const [deleteArticle] = useDeleteArticleMutation()
  const { username } = useAuth()
  const navigate = useNavigate()

  const handleLike = async (slug) => {
    if (article.favorited) {
      await dislike(slug)
    } else {
      await like(slug)
    }
  }

  const confirm = async () => {
    try {
      await deleteArticle(article.slug)
      message.success('Article has been deleted')
      navigate('/', { replace: true })
    } catch (e) {
      message.error(`Error ${e.status}`)
    }
  }

  return (
    <li className={`${s.card} wrapper`}>
      <div className={s.card__top}>
        <div className={s.card__left}>
          <div className={s.card__header}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to={`/articles/${article.slug}`} className={s.card__title}>
              {article.title}
            </Link>
            <Like
              count={article.favoritesCount}
              favorited={article.favorited}
              handleLike={() => handleLike(article.slug)}
              disable={!username}
            />
          </div>
          <TagList arrTags={article.tagList} />
          <span>{article.description}</span>
        </div>
        <div className={s.card__right}>
          <User username={article.author.username} createDate={article.createdAt} image={article.author.image} />
          {username === article.author.username && currentSlug ? (
            <div className={s.card__btns}>
              <Popconfirm
                placement="right"
                title="Are you sure to delete this article?"
                description="Delete the article"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <button className="deleteBtn" type="button">
                  Delete
                </button>
              </Popconfirm>
              <Link to="edit" className="editBtn">
                Edit
              </Link>
            </div>
          ) : null}
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
export default ArticleCard
