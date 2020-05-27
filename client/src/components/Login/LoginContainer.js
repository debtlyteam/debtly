import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import LoginView from 'components/Login/LoginView'
import { login, register, setErrorMessage } from 'actions/appActions'

class LoginContainer extends React.Component {
  componentWillMount() {
    this.props.clearErrors()
  }

  render() {
    const { loggedIn,
            handleLogin,
            handleRegister,
            currentlySending,
            formState,
            errorMessage } = this.props

    return (
      <div>
        {loggedIn ? (
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
  loggedIn: state.loggedIn,
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
