import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArticleQuery } from '../../redux'
import ArticleCard from '../ArticleCard'

function ArticlePage({ slug }) {
  console.log(useParams())
  const { data, isLoading } = useGetArticleQuery(useParams().slug)
  console.log(data)
  if (isLoading) {
    return <h1>СТАТЬЯ ЗАГРУЖАЕТСЯ</h1>
  }
  return (
    <div>
      <h1>ArticlePage {slug}</h1>
      <ArticleCard article={data.article} markDown={data.article.body} />
    </div>
  )
}

export default ArticlePage
