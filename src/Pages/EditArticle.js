import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { useUpdateArticleMutation, useGetArticleQuery } from '../redux'

function EditArticle() {
  const { slug } = useParams()
  console.log('slug   >>>>  ', slug)
  const { data = {}, isLoading, isError } = useGetArticleQuery(slug)
  const navigate = useNavigate()
  const [updateArticle, { isLoading: isUpdateArticle }] = useUpdateArticleMutation()
  const handleUpdateArticle = async (updArticle) => {
    try {
      await updateArticle({
        article: {
          ...updArticle,
          // tagList: tags,
        },
        slug,
      }).unwrap()
      navigate(`/articles/${slug}`)
    } catch (err) {
      console.log(err)
    }
  }

  if (isUpdateArticle) {
    return <h1>Updating</h1>
  }

  if (isLoading) {
    return <h1>LOADING</h1>
  }

  if (isError) {
    return <h1>Error</h1>
  }

  // console.log(data)
  return (
    <>
      <h1>Edit Article Page</h1>
      <ArticleForm title="Create new article" article={data.article} onSubmit={handleUpdateArticle} />
    </>
  )
}

export default EditArticle
