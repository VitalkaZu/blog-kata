import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { message, Popconfirm } from 'antd'
import Tag from '../UI/Tag'
import s from './ArticleCard.module.scss'
import Like from '../Like'
import User from '../UI/User/User'
import CustomButton from '../UI/CustomButton'
import { useAuth } from '../../hooks/useAuth'
// import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../redux'
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation, useDeleteArticleMutation } from '../../redux'

function ArticleCard({ article, markDown, onClick }) {
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

  const handleEdit = () => {
    navigate('edit')
  }

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
        {username === article.author.username ? (
          <div className={s.card__btns}>
            <Popconfirm
              placement="right"
              title={text}
              description={description}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              {/* <Button>Right</Button> */}
              <CustomButton cl="deleteBtn">Delete</CustomButton>
            </Popconfirm>
            <CustomButton cl="editBtn" onClick={() => handleEdit()}>
              Edit
            </CustomButton>
          </div>
        ) : null}
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
