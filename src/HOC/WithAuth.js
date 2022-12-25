import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

function WithAuth({ children }) {
  const location = useLocation()
  console.log(location)
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return children
}

export { WithAuth }
