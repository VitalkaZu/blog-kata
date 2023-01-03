import React from 'react'
// import { useGetArticlesQuery } from '../../redux'
import { Route, Routes } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useAuth } from '../../hooks/useAuth'
import { useGetProfileQuery } from '../../redux/blogApi'
import ArticlesList from '../ArticlesList'
import './reset.scss'
import './glogal.scss'
import Header from '../Header'
// import Home from '../../Pages/Home'
import SignUp from '../../Pages/SignUp'
import SignIn from '../../Pages/SignIn'
import ArticlePage from '../../Pages/ArticlePage'
import UserProfile from '../../Pages/UserProfile'
import EditArticle from '../../Pages/EditArticle'
import { WithAuth } from '../../HOC/WithAuth'
import NewPost from '../../Pages/NewPost'
// import { setToken, setUser } from '../../redux/slices/userSlice'

function App() {
  useGetProfileQuery()
  // const dispatch = useDispatch()
  // const { getProfile } = useGetProfileQuery()
  // const { username, token } = useAuth()

  // useEffect(() => {
  //   if (!username && localStorage.getItem('token')) {
  //     const fetchData = async () => {
  //       await dispatch(setToken(localStorage.getItem('token')))
  //       // You can await here
  //       // const response = await MyAPI.getData(someId)
  //       console.log('call async function')
  //       // ...
  //     }
  //     fetchData()
  //     // await dispatch(setToken(localStorage.getItem('token')))
  //     // const { user } = useGetProfileQuery()
  //     if (getProfile) {
  //       dispatch(setUser(getProfile))
  //     }
  //     console.log('token in localstorage >>>>', localStorage.getItem('token'))
  //   }
  // }, [token, getProfile])

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
      </Route>
    </Routes>
  )
}

export default App
