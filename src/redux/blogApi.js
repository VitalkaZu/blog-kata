import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState()
      if (state.userSlice.user.token || localStorage.getItem('token')) {
        headers.set('Authorization', `Bearer ${state.userSlice.user.token || localStorage.getItem('token')}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ limit, offset }) => `articles?limit=${limit}&offset=${offset}`,
      // providesTags: ['Article'],
      // eslint-disable-next-line arrow-body-style
      providesTags: (result) => {
        return result ? [...result.articles.map(({ slug }) => ({ type: 'Article', id: slug })), 'Article'] : ['Article']
      },
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
      // eslint-disable-next-line arrow-body-style

      providesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    registerUser: build.mutation({
      query(body) {
        return {
          url: 'users',
          method: 'POST',
          body,
        }
      },
    }),
    loginUser: build.mutation({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body,
        }
      },
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: 'user',
          method: 'PUT',
          body,
        }
      },
    }),
    getProfile: build.query({
      query: () => 'user',
    }),
    favoriteArticle: build.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'POST',
        }
      },
      // invalidatesTags: [{ type: 'Article', id: 1 }],
      // invalidatesTags: ['Article'],
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    unFavoriteArticle: build.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'DELETE',
        }
      },
      // invalidatesTags: ['Article'],
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    addArticle: build.mutation({
      query(body) {
        console.log(body)
        return {
          url: 'articles',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Article'],
    }),
    deleteArticle: build.mutation({
      query(slug) {
        // console.log(body)
        return {
          url: `articles/${slug}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Article'],
    }),
    updateArticle: build.mutation({
      query({ article, slug }) {
        // console.log(body)
        return {
          url: `articles/${slug}`,
          method: 'PUT',
          body: { article },
        }
      },
      invalidatesTags: ['Article'],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = blogApi
