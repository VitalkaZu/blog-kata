import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArticleQuery } from '../redux'
import ArticleCard from '../components/ArticleCard'
import LoadIndicator from '../components/UI/LoadIndicator'
import ErrorIndicator from '../components/UI/ErrorIndicator'

function ArticlePage() {
  const { slug } = useParams()
  const { data, isLoading, isError, error } = useGetArticleQuery(slug)
  if (isError) {
    return <ErrorIndicator error={error.status} />
  }

  if (isLoading) {
    return <LoadIndicator tip="Load article" />
  }

  return (
    <ArticleCard article={data.article} markDown={data.article.body} />
  )
}

export default ArticlePage
