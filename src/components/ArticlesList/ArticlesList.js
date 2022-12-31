import React, { useState } from 'react'
import { Pagination } from 'antd'
import ArticleCard from '../ArticleCard'
import s from './ArticlesList.module.scss'
import { useGetArticlesQuery } from '../../redux'

function ArticlesList() {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const { data = [], isLoading } = useGetArticlesQuery(page * pageSize - pageSize)
  if (isLoading) {
    return <h1>Загрузка информации</h1>
  }
  // const arrArticles = data.articles
  // const total = data.articlesCount
  const { articles: arrArticles, articlesCount: total } = data
  console.log(data.articles)
  return (
    <div className={`${s.list} wrapper`}>
      <ul className={s.list__items}>
        {arrArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        className={`${s.list__pagination} wrapper`}
        defaultCurrent={page}
        pageSize={pageSize}
        total={total}
        onChange={(e) => setPage(e)}
      />
    </div>
  )
}

export default ArticlesList
