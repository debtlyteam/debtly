// TODO: decide whether to keep these or not
import ErrorView from 'components/ErrorView'
import LoadingView from 'components/LoadingView'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import LoginView from 'components/Login/LoginView'
import { login, register, setErrorMessage } from 'actions/appActions'

class LoginContainer extends React.Component {
  //TODO
  UNSAFE_componentWillMount () {
    this.props.clearErrors()
  }

  render () {
    const {
      isLoggedIn,
      handleLogin,
      handleRegister,
      currentlySending,
      formState,
      errorMessage
    } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <LoginView
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            currentlySending={currentlySending}
            formState={formState}
            errorMessage={errorMessage}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
  currentlySending: state.currentlySending,
  formState: state.formState,
  errorMessage: state.errorMessage
})

const mapDispatchToProps = dispatch => ({
  handleLogin: (email, password) => dispatch(login(email, password)),
  handleRegister: (name, email, password) => dispatch(register(name, email, password)),
  // TODO: add register function handler here
  clearErrors: () => dispatch(setErrorMessage(''))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer))
