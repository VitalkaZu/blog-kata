import React from 'react'
// import { useGetArticlesQuery } from '../../redux'
import { Route, Routes } from 'react-router-dom'
import ArticlesList from '../ArticlesList'
import './reset.scss'
import './glogal.scss'
import Header from '../Header'
import Home from '../../pages/Home'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import ArticlePage from '../../pages/ArticlePage'
import UserProfile from '../../pages/UserProfile'
import { WithAuth } from '../../HOC/WithAuth'
import NewPost from '../../pages/NewPost'

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
        <Route
          path="/newarticle"
          element={(
            <WithAuth>
              <NewPost />
            </WithAuth>
          )}
        />
      </Route>
    </Routes>
  )
}

export default App
