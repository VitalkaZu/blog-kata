import React from 'react'
import { useNavigate } from 'react-router-dom'
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
          // tagList: tags,
        },
      }).unwrap()
      console.log(newArticle)
      navigate(`/articles/${newArticle.article.slug}`)
    } catch (err) {
      console.log(err)
    }
  }

  return <ArticleForm title="Create new article" onSubmit={handleAddArticle} />
}

export default NewPost
