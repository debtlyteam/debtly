import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = (props) => (
  <Route {...props.isLoggedIn} render={() => {
    //for testing
    authenticate()
    if (props.isLoggedIn === true) {
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
    .then(data => { console.log(data.isLoggedIn); return data.isLoggedIn })
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object
}

function mapStateToProps (state) {
  const loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
