import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'
import { useAuth } from '../hooks/useAuth'
import ArticleForm from '../components/ArticleForm'
import { useUpdateArticleMutation, useGetArticleQuery } from '../redux'
import ErrorIndicator from '../components/UI/ErrorIndicator'
import LoadIndicator from '../components/UI/LoadIndicator'

function EditArticle() {
  const { slug } = useParams()
  const { data = {}, isLoading, isError, error } = useGetArticleQuery(slug)
  const navigate = useNavigate()
  const [updateArticle, { isLoading: isUpdateArticle }] = useUpdateArticleMutation()
  const { username } = useAuth()

  if (data.article.author.username !== username) {
    navigate(`/articles/${slug}`)
  }

  const handleUpdateArticle = async (updArticle) => {
    try {
      await updateArticle({
        article: {
          ...updArticle,
        },
        slug,
      }).unwrap()
      message.success('Article updated')
      navigate(`/articles/${slug}`)
    } catch (err) {
      message.error(`Error ${err.status}`)
    }
  }

  if (isUpdateArticle) {
    return <LoadIndicator tip="Update article" />
  }

  if (isLoading) {
    return <LoadIndicator tip="Load article info" />
  }

  if (isError) {
    return <ErrorIndicator error={error} />
  }

  return <ArticleForm title="Edit article" article={data.article} onSubmit={handleUpdateArticle} />
}

export default EditArticle
