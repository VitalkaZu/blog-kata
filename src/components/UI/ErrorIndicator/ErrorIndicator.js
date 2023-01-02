import React from 'react'
import { Alert } from 'antd'

function ErrorIndicator({ error }) {
  return (
    <div className="wrapper">
      <Alert message="Error" description={error} type="error" showIcon />
    </div>
  )
}

export default ErrorIndicator
