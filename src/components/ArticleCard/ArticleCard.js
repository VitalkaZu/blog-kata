import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { message, Popconfirm } from 'antd'
import Tag from '../UI/Tag'
import s from './ArticleCard.module.scss'
import Like from '../Like'
import User from '../UI/User/User'
// import CustomButton from '../UI/CustomButton'
import { useAuth } from '../../hooks/useAuth'
// import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../redux'
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
      // console.log('dislike', slug)
    } else {
      await like(slug)
      // console.log('like', slug)
    }
  }

  const text = 'Are you sure to delete this article?'
  const description = 'Delete the article'

  const confirm = async () => {
    try {
      await deleteArticle(article.slug)
      message.info('Article has been deleted')
      navigate('/', { replace: true })
    } catch (e) {
      console.log(e)
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
            />
          </div>
          <ul>
            {article.tagList &&
              article.tagList.map((tag, index) => {
                const tagTrim = tag.trim()
                if (tagTrim.length > 0 && tagTrim.length < 30) {
                  return <Tag key={index} label={tagTrim} />
                }
                return false
              })}
          </ul>
          <span>{article.description}</span>
        </div>
        <div className={s.card__right}>
          <User username={article.author.username} createDate={article.createdAt} image={article.author.image} />
          {username === article.author.username && currentSlug ? (
            <div className={s.card__btns}>
              <Popconfirm
                placement="right"
                title={text}
                description={description}
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                {/* <CustomButton cl="deleteBtn">Delete</CustomButton> */}
                <button className="deleteBtn" type="button">
                  Delete
                </button>
              </Popconfirm>
              {/* <button className="editBtn" type="button" onClick={() => handleEdit()}> */}
              {/*   Edit */}
              {/* </button> */}
              <Link to="edit" className="editBtn">
                Edit
              </Link>
              {/* <CustomButton cl="editBtn" onClick={() => handleEdit()}> */}
              {/*   Edit */}
              {/* </CustomButton> */}
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
