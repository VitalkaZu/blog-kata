import React from 'react'
// import { useGetArticlesQuery } from '../../redux'
import { Route, Routes } from 'react-router-dom'
import ArticlesList from '../ArticlesList'
import './reset.scss'
import './glogal.scss'
import Header from '../Header'
import Home from '../../Pages/Home'
import SignUp from '../../Pages/SignUp'
import SignIn from '../../Pages/SignIn'
import ArticlePage from '../../Pages/ArticlePage'
import UserProfile from '../../Pages/UserProfile'
import EditArticle from '../../Pages/EditArticle'
import { WithAuth } from '../../HOC/WithAuth'
import NewPost from '../../Pages/NewPost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* protected routes */}
        <Route element={<WithAuth />}>
          <Route path="/newarticle" element={<NewPost />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
