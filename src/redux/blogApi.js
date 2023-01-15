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
      // eslint-disable-next-line arrow-body-style
      providesTags: (result) => {
        return result ? [...result.articles.map(({ slug }) => ({ type: 'Article', id: slug })), 'Article'] : ['Article']
      },
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
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
      invalidatesTags: ['Article'],
    }),
    loginUser: build.mutation({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Article'],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    unFavoriteArticle: build.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    addArticle: build.mutation({
      query(body) {
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
        return {
          url: `articles/${slug}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg }],
    }),
    updateArticle: build.mutation({
      query({ article, slug }) {
        return {
          url: `articles/${slug}`,
          method: 'PUT',
          body: { article },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg.slug }],
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
  useLazyGetProfileQuery,
} = blogApi
