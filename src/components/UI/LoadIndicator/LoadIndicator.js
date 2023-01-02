import React from 'react'
import { Spin } from 'antd'

function LoadIndicator({ tip }) {
  return <Spin tip={tip} size="large" />
}

export default LoadIndicator
