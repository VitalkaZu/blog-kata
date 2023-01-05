import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="wrapper">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">
        Go home page
      </Link>
    </div>
  )
}

export default NotFoundPage
