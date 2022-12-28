import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState()
      // const {
      //   userSlice: { user }
      // } = getState()
      // console.log('token  >>>  ', state.userSlice?.user?.token)
      // const token = user.token
      if (state.userSlice.user.token) {
        headers.set('Authorization', `Bearer ${state.userSlice.user.token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (offset = 0) => `articles?limit=5&offset=${offset}`,
      providesTags: ['Article'],
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
      providesTags: ['Article'],
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
      query: (username) => `profiles/${username}`,
    }),
    favoriteArticle: build.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'POST',
        }
      },
      invalidatesTags: ['Article'],
    }),
    unFavoriteArticle: build.mutation({
      query(slug) {
        return {
          url: `/articles/${slug}/favorite`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Article'],
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
  useGetProfileQuery,
} = blogApi
