import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (offset = 0) => `articles?limit=5&offset=${offset}`,
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleQuery } = blogApi
