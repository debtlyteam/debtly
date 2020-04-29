import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Login from '../components/Login'

class Loginscreen extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.actions;
  }
  // we need to replace this, but I suspect with the addition of our new redux usage we want to revamp this a lot anyway
  /* eslint-disable */
  UNSAFE_componentWillMount () {
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
      loginmessage: loginmessage
    })
  }

  render () {
    return (
      <div className="loginscreen">
        <Login/>
        <div>
          {this.state.loginmessage}
        </div>
      </div>
    )
  }
}

export default Loginscreen
