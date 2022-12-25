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
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/newarticle" element={<WithAuth><NewPost /></WithAuth>} />
      </Route>
    </Routes>
  )
}

export default App
