import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArticleQuery } from '../redux'
import ArticleCard from '../components/ArticleCard'
import LoadIndicator from '../components/UI/LoadIndicator'
import ErrorIndicator from '../components/UI/ErrorIndicator'

function ArticlePage() {
  // console.log(useParams())
  const { slug } = useParams()
  // console.log(slug)
  // console.log(useParams().slug)
  const { data, isLoading, isError, error } = useGetArticleQuery(slug)
  // console.log(data)
  if (isError) {
    console.log(error)
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
