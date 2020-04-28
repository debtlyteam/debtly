import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Login from '../components/Login'

class Loginscreen extends React.Component {
  // we need to replace this, but I suspect with the addition of our new redux usage we want to revamp this a lot anyway
  /* eslint-disable */
  UNSAFE_componentWillMount () {
    var loginscreen = []
    loginscreen.push(<Login parentContext={this}/>)// appContext={this.props.parentContext}/>)
    var loginmessage = 'Not registered yet, Register Now'
    console.log('asdas')
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage
    })
  }

  render () {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
              <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}
const style = {
  margin: 15
}

export default Loginscreen
