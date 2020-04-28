import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from "react-router";

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
      return <Component {...this.props} />
    }
    else {
      return <Redirect to='/login'/>
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)