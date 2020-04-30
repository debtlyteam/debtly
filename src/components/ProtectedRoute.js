import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from "react-router";
import { Route, Switch } from 'react-router-dom'

// const ProtectedRoute = ({ component : Component, ...rest}) => (

// )
const ProtectedRoute = (props) => (
  <Route {...props.isLoggedIn} render={() => {
    if(props.isLoggedIn === true) {
          return (
            <div>{props.children}</div>
            )
        }
        else {
          return (
              <Redirect to='/login'/>
          )
        }
  }} />
)

function mapStateToProps(state) {
  let loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)