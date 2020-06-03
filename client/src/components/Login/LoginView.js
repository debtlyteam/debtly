// TODO: decide whether to keep these or not
import ErrorBox from 'components/ErrorBox'
// import LoadingView from 'components/LoadingView'

import React, { Component } from 'react'
import {
  Button, TextField, CssBaseline,
  Container, Avatar, Typography, Box, Collapse,
  Fade, IconButton
} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => (
  {
    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      alignItems: 'center'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    login: {
      margin: theme.spacing(0.5, 0),
      marginTop: 10
    },
    margin: {
      margin: theme.spacing(1)
    },
    register: {
      margin: theme.spacing(0.5, 0)
    },
    box: {
      borderRadius: 10,
      boxShadow: '2px 2px 6px',
      padding: 50,
      marginTop: 50,
      borderColor: theme.palette.primary.main
    },
    textEntry: {
      margin: '6px 0px'
    }
  })

class LoginView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      tryRegister: false,
      showPassword: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRegister = props.handleRegister
    this.handleLogin = props.handleLogin
  }

  static get propTypes () {
    return {
      LoadingView: PropTypes.object,
      classes: PropTypes.object,
      handleRegister: PropTypes.func,
      handleLogin: PropTypes.func,
      errorMessage: PropTypes.string,
      clearErrors: PropTypes.func,
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.tryRegister) {
      this.handleRegister(this.state.name, this.state.email, this.state.password)
    } else {
      this.handleLogin(this.state.email, this.state.password)
    }
  }

  setTryRegister(newState) {
    this.props.clearErrors()
    this.setState({tryRegister : newState})
  }

  render () {
    const { classes, errorMessage } = this.props
    return (
      <Container component='main' maxWidth='xs'>
        <Box className={classes.box}
          border={1}>
          <CssBaseline/>
          <Box
            display='flex'
            flexDirection='row'
          >
            <Fade in={this.state.tryRegister}>
              <IconButton
                onClick={(e) => { this.setTryRegister(false) }}
              >
                <ArrowBack/>
              </IconButton>
            </Fade>
          </Box>

          <div className={classes.paper}>
            <Avatar className={classes.avatar} color='primary'>
              <LockOpenIcon/>
            </Avatar>
            <Typography component='h1' variant='h5'>
              {this.state.tryRegister ? 'Register' : 'Login'}
            </Typography>
            <form className={classes.form}
              onSubmit={this.handleSubmit}
            >
              <Collapse in={this.state.tryRegister}>
                <TextField
                  className={classes.textEntry}
                  variant='outlined'
                  margin='normal'
                  required={this.state.tryRegister}
                  fullWidth
                  id='name'
                  label='Enter your Name'
                  onChange = {(event) => {
                    this.setState({ name: event.target.value })
                  }}
                />
              </Collapse>
              <TextField
                className={classes.textEntry}
                variant='outlined'
                required
                fullWidth
                id='email'
                label="Enter your Email"
                name='email'
                autoComplete='email'
                autoFocus
                onChange = {(event) => {
                  this.setState({ email: event.target.value })
                }}
              />
              <TextField
                className={classes.textEntry}
                variant='outlined'
                required
                fullWidth
                id='password'
                label='Enter your Password'
                name='password'
                type={this.state.showPassword ? '' : 'password'}
                autoComplete='password'
                onChange = {(event) => {
                  this.setState({ password: event.target.value })
                }}
                InputProps={{
                  endAdornment:
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => {
                          this.setState({ showPassword: !this.state.showPassword })
                        }}
                      >
                        {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                      </IconButton>
                }}
              />
              <ErrorBox message={errorMessage}/>
              <Collapse in={!this.state.tryRegister}>
                <Button
                  className={classes.login}
                  type={this.state.tryRegister ? 'button' : 'submit'}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
            Login
                </Button>
                <Button
                  className={classes.register}
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={(e) => {
                    this.setTryRegister(true);
                  }}
                >
            Create new account
                </Button>
              </Collapse>
              <Collapse in={this.state.tryRegister}>
                <Button
                  className={classes.register}
                  type={!this.state.tryRegister ? 'button' : 'submit'}
                  fullWidth
                  variant="outlined"
                  color="primary"
                >
                  Register
                </Button>
              </Collapse>
            </form>
          </div>
        </Box>
      </Container>
    )
  }
}

export default withRouter((withStyles(styles)((LoginView))))
