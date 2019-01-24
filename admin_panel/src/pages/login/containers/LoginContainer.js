import React from 'react'
import { Card, Col, Row } from 'antd'
import LoginForm from '../components/LoginForm'
import * as authActions from '../../../modules/auth'
import SplashLogo from '../../../assets/img/octocat.png'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import { isLoggedIn } from '../../components/UserIsAuthenticated'

class LoginContainer extends React.Component {

  onLogin = (creds) => {
    console.log('Form submitted with Username:' + creds.username + ' and password: ' + creds.password)

    this.props.loginUser(creds)
  }

  render () {
    return (
      <React.Fragment>
        <div className={"login-form-container"}>
          <div className={"login-form-content"}>
            <Card id="login-form" bordered={true} title={""}>

                <Row>
                  <Col className="login-form-left" span={10}>
                    <img className={"login-splash"} src={SplashLogo} alt={"login-branding-logo"} />
                    <h1 className={"login-form-branding"}>MediumClone</h1>
                    <p className={"login-form-branding-sub"}>...</p>
                  </Col>
                  <Col className={"login-form-right"} span={14}>
                    <LoginForm
                      onSubmit={this.onLogin}
                      authMessage={this.props.authMessage}
                      isAuthenticated={this.props.isAuthenticated}
                      isFetching={this.props.isFetching}
                      authMessageClass={this.props.authMessageClass}
                    />
                  </Col>
                </Row>

            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.authReducer.isFetching,
    isAuthenticated: state.authReducer.isAuthenticated,
    authMessage: state.authReducer.authMessage,
    authMessageClass: state.authReducer.authMessageClass,
    user: state.authReducer.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loginUser: authActions.loginUser,
    goToRegister: () => push('/register')
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(isLoggedIn(LoginContainer))
