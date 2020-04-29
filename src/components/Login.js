import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../components/Actions';
import { withRouter } from 'react-router'


class Login extends Component {
  constructor(props){
    super(props);
    this.actions = props.actions;
    this.state={
      username:'',
      password:''
    }
  }

  handleLoginButtonClick(event) {
    // we can do backend login attempt here or in the reducer, although it feels like this is a better place for it since the reducer should primarily take care of state changes
    this.actions.AttemptLogin({username: this.state.username, password: this.state.password})
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange = {(event) => {this.setState({username:event.target.value})
        }}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event) => this.setState({password:event.target.value})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLoginButtonClick(event)}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 15
}

function mapStateToProps (state, ownProps) {
  let loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
