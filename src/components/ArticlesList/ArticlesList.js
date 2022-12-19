import React from 'react'
import ArticleCard from '../ArticleCard'
import s from './ArticlesList.module.scss'

function ArticlesList({ arrArticles }) {
  return (
    <ul className={s.list}>
      {arrArticles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </ul>
  )
}

export default ArticlesList
