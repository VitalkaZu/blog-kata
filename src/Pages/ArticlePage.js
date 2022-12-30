import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetArticleQuery } from '../redux'
import ArticleCard from '../components/ArticleCard'

function ArticlePage() {
  // console.log(useParams())
  const { slug } = useParams()
  // console.log(slug)
  // console.log(useParams().slug)
  const { data, isLoading } = useGetArticleQuery(slug)
  // console.log(data)
  if (isLoading) {
    return <h1>СТАТЬЯ ЗАГРУЖАЕТСЯ</h1>
  }
  return (
    <div>
      <ArticleCard article={data.article} markDown={data.article.body} />
    </div>
  )
}

export default ArticlePage
