import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from '../../modules/auth';

class LogoutPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(authActions.logoutUser());
  }

  render() {
    return (
      <Redirect to="/login" />
    )
  }

}

export default connect()(LogoutPage);