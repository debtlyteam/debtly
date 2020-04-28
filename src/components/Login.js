import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../components/Actions';

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
    this.actions.AttemptLogin([this.state.username, this.state.password])
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
              onChange = {(event, newValue) => this.setState({ username: newValue })}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event, newValue) => this.setState({ password: newValue })}
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
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
