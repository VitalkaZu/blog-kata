import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { useGetArticleQuery } from '../redux'

function EditArticle() {
  // const { slug } = useParams()
  // console.log('slug >>>', slug)
  const { article = {}, isLoading, isError } = useGetArticleQuery(useParams().slug)
  console.log(isLoading)
  console.log(isError)
  if (isLoading) {
    return <h1>LOADING</h1>
  }

  console.log(article)
  return (
    <>
      <h1>Edit Article Page</h1>
      <ArticleForm title="Create new article" article={article} />
    </>
  )
}

export default EditArticle
