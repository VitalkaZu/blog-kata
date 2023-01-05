import React from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import ArticleForm from '../components/ArticleForm'
import { useAddArticleMutation } from '../redux'

function NewPost() {
  const navigate = useNavigate()
  const [addArticle] = useAddArticleMutation()

  const handleAddArticle = async (data) => {
    try {
      const newArticle = await addArticle({
        article: {
          ...data,
        },
      }).unwrap()
      message.success('Article created')
      navigate(`/articles/${newArticle.article.slug}`)
    } catch (err) {
      message.error(err.status)
    }
  }

  return <ArticleForm title="Create new article" onSubmit={handleAddArticle} />
}

export default NewPost
