import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import ErrorBox from 'components/ErrorBox'
import LoadingView from 'components/LoadingView'
import { logout } from 'actions/appActions'

class LogoutContainer extends React.Component {
  componentWillMount () {
    if (this.props.isLoggedIn) {
      this.props.handleLogout()
    }
  }

  render () {
    const { isLoggedIn, currentlySending, errorMessage } = this.props

    return (
      <div>
        {!isLoggedIn && <Redirect to="/login" />}
        <LoadingView currentlySending={currentlySending} />
        <ErrorBox message={errorMessage} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
  currentlySending: state.currentlySending,
  errorMessage: state.errorMessage
})

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutContainer))
