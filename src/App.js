import React from 'react'
import { useGetArticlesQuery } from './redux'
import ArticlesList from './components/ArticlesList'

function App() {
  const { data = [], isLoading } = useGetArticlesQuery()
  if (isLoading) {
    return <h1>Загрузка информации</h1>
  }
  console.log(data.articles)
  return (
    <div>
      <span>Hello</span>
      <ArticlesList arrArticles={data.articles} />
    </div>
  )
}

export default App
