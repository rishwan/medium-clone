import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from '../../components/sidebar'
import Header from '../../components/header'
import Login from '../login'
import Logout from '../logout'
import Article from '../article'
import './styles.css'

const App = () => (
  <React.Fragment>
    <main>
      <Layout>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content style={{margin: '24px 16px', padding: 24, background: "#fff", minHeight: 280}}>
            <Route exact path="/" component={Login} />
            <Route exact path={"/login"} component={Login} />
            <Route path={"/article"} component={Article} />
            <Route exact path={"/logout"} component={Logout} />
          </Layout.Content>
        </Layout>
      </Layout>
    </main>
  </React.Fragment>
)

export default App
