import React from 'react'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'
import ArticleCard from '../ArticleCard'
import LoadIndicator from '../UI/LoadIndicator'
import s from './ArticlesList.module.scss'
import { useGetArticlesQuery } from '../../redux'

function ArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = searchParams.get('limit') || 5
  const offset = searchParams.get('offset') || 0
  console.log(limit, offset)
  // const [page] = useState(1)
  const { data = [], isFetching } = useGetArticlesQuery({
    limit,
    offset,
  })

  const handlePaginationPage = (currentPage, pageSizeSelect) => {
    setSearchParams({ limit: pageSizeSelect, offset: currentPage * pageSizeSelect - pageSizeSelect })
  }

  if (isFetching) {
    return <LoadIndicator tip="Load article list" />
  }

  const { articles: arrArticles, articlesCount: total } = data
  return (
    <div className={`${s.list} wrapper`}>
      <ul className={s.list__items}>
        {arrArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        className={`${s.list__pagination} wrapper`}
        defaultCurrent={offset / limit + 1}
        pageSize={limit}
        total={total}
        onChange={handlePaginationPage}
      />
    </div>
  )
}

export default ArticlesList
