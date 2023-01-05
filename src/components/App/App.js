import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLazyGetProfileQuery } from '../../redux/blogApi'
import ArticlesList from '../ArticlesList'
import './reset.scss'
import './glogal.scss'
import Header from '../Header'
import SignUp from '../../Pages/SignUp'
import SignIn from '../../Pages/SignIn'
import ArticlePage from '../../Pages/ArticlePage'
import UserProfile from '../../Pages/UserProfile'
import EditArticle from '../../Pages/EditArticle'
import { WithAuth } from '../../HOC/WithAuth'
import NewPost from '../../Pages/NewPost'
import NotFoundPage from '../../Pages/NotFoundPage'

function App() {
  const [trigger] = useLazyGetProfileQuery()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      trigger()
    }
  }, [isAuth])

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* protected routes */}
        <Route element={<WithAuth />}>
          <Route path="/new-article" element={<NewPost />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
