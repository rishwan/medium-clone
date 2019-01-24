import React from 'react'
import { Form, Icon, Input, Button, Divider} from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: null,
      password: null
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    console.log('Login Form submitted')

    this.props.onSubmit(this.state)
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <React.Fragment>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit} className={"login-form"}>

          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{required: true, message:'Please input your username'}],
            })(
              <Input name={'email'} onChange={this.handleInputChange}  prefix={<Icon type={"user"} style={{color: 'rgba(0,0,0,.25)'}} />} placeholder={"Username"} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message:'Please input your password'}],
            })(
              <Input name={'password'} onChange={this.handleInputChange} prefix={<Icon type={"lock"} style={{color: 'rgba(0,0,0,.25)'}} />} type={"password"} placeholder={"Password"} />
            )}
          </FormItem>

          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching}>
            Log in
          </Button>

          <Divider type="horizontal" />

          <Button className={"login-form-forgot"}>Forgot password?</Button>

        </Form>
      </React.Fragment>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm