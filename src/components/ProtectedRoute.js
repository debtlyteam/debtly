import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from "react-router";
import { Route, Switch } from 'react-router-dom'

// const ProtectedRoute = ({ component : Component, ...rest}) => (

// )

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : props.isLoggedIn
    }
  }

  render() {
    if(this.state.isLoggedIn === true) {
      console.log(this.props)
      return (
        <Route>
          <Component {...this.props} />
        </Route>
        )
    }
    else {
      return (
          <Redirect to='/login'/>
      )
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