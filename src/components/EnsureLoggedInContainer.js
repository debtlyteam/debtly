import React, { Component } from 'react';
import {connect} from 'react-redux'

class EnsureLoggedInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : props.isLoggedIn
    }
  }
  componentDidMount() {
    // const { dispatch, currentURL } = this.props

    // if (!isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(currentURL))
      // browserHistory.replace("/login")
    // }
  }

  render() {
    console.log("HLEOOLOKLGS")
    console.log(this.state.isLoggedIn)
    if (this.state.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.loggedIn,
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)