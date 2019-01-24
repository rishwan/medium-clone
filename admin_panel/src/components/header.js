import React from 'react'
import { Layout } from 'antd'
import { VisibleOnlyLogged } from '../pages/components/UserIsAuthenticated'

class Header extends React.Component {
  render () {
    return (
      <Layout.Header style={{background: '#fff', padding: 0}} />
    )
  }
}

export default VisibleOnlyLogged(Header)