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
    registerUser: build.mutation({
      query(body) {
        return {
          url: 'users',
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleQuery, useRegisterUserMutation } = blogApi
