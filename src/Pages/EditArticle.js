import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { useUpdateArticleMutation, useGetArticleQuery } from '../redux'

function EditArticle() {
  const { slug } = useParams()
  const { data = {}, isLoading, isError } = useGetArticleQuery(useParams().slug)
  const navigate = useNavigate()
  const [updateArticle, { isLoading: isUpdateArticle }] = useUpdateArticleMutation()
  // const  useParams('slig')

  const handleUpdateArticle = async (updArticle) => {
    try {
      const newArticle = await updateArticle(
        {
          article: {
            ...updArticle,
          },
        },
        slug
      ).unwrap()
      navigate(`/articles/${newArticle.article.slug}`)
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
