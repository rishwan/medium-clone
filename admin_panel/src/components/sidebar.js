import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Badge } from 'antd'
import {withRouter} from 'react-router-dom';
import { VisibleOnlyLogged } from '../pages/components/UserIsAuthenticated'

class Sidebar extends React.Component{
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
      selectedKeys: null
    }
  }


  handleClick = (e) => {
    this.setState({
      selectedKeys: e.keyPath
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  displayLogo = () => {
    if(this.state.collapsed === true) {
      return (
        <Icon type="appstore" />
      )
    } else {
      return (
        <React.Fragment>
          <div className={"branding"}>
            <p>MEDIUMCLONE</p>
          </div>
        </React.Fragment>
      )
    }
  }

  render () {

    return (
      <Layout.Sider
        className={'sidebar-container'}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" onClick={this.toggle}>
          {this.displayLogo()}
        </div>
        <div className={"menu-container"}>
          <Menu theme={"dark"} mode={"inline"} defaultSelectedKeys={['dashboard']} selectedKeys={this.state.selectedKeys} onClick={this.handleClick}>
            <Menu.Item key="dashboard">
              <Link to={"/dashboard"}>
                <Icon type="dashboard" />
                <span>Dashboard <Badge dot={false} /></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to={"/article/list"}>
                <Icon type="appstore" />
                <span>Articles <Badge dot={false} /></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to={"/logout"}>
                <Icon type="appstore" />
                <span>Logout <Badge dot={false} /></span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <div className={"side-menu-trigger"} onClick={this.toggle}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </div>

      </Layout.Sider>
    )
  }
}


export default withRouter(VisibleOnlyLogged(Sidebar))