import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from "react-router";

// const ProtectedRoute = ({ component : Component, ...rest}) => (

// )

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.isLoggedIn)
    this.state = {
      isLoggedIn : props.isLoggedIn
    }
  }

  render() {
    console.log(this.state.isLoggedIn)
    if(this.state.isLoggedIn === true) {
      return <Component {...this.props} />
    }
    else {
      return <Redirect to='/login'/>
    }
  }
}

function mapStateToProps(state, ownProps) {
  let loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)