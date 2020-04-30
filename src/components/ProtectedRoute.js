import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = (props) => (
  <Route {...props.isLoggedIn} render={() => {
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
