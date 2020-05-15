import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = (props) => (
  <Route {...props.isLoggedIn} render={() => {
    let x = authenticate()
    let user = localStorage.getItem('token')
    if (user !== null) {
      return (
        <div>{props.children}</div>
      )
    } else {
      return (
        <Redirect to='/login'/>
      )
    }
  }} />
)

function authenticate() {
  fetch('/authenticate')
    .then(res => res.json()) // TODO: check res.ok!!!
    .then(data => { return true;/*data.isLoggedIn*/ })
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object
}

function mapStateToProps (state) {
  const loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn,
    isLoggingIn: loginState.isLoggingIn
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
