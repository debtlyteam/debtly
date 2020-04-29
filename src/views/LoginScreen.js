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
    var loginscreen=[];
    loginscreen.push(<Login/>);
    var loginmessage = "Not registered yet, Register Now";
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

const style = {
  margin: 15
}

export default Loginscreen
