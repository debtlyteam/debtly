import React, { Component } from 'react'
import {
  Button, TextField, ThemeProvider, CssBaseline,
  Container, Avatar, Typography, Box, Collapse,
  Fade, IconButton
} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../components/Actions'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import theme from './Theme'
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

class Login extends Component {
  constructor (props) {
    super(props)
    this.actions = props.actions
    this.state = {
      name: '',
      username: '',
      password: '',
      tryRegister: false,
      showPassword: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static get propTypes () {
    return {
      actions: PropTypes.object,
      history: PropTypes.object,
      classes: PropTypes.object.isRequired
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.tryRegister) {
      this.attemptRegister()
    } else {
      this.attemptLogin()
    }
  }

  attemptLogin () {
    // we can do backend login attempt here or in the reducer, although it feels like this is a better place for it since the reducer should primarily take care of state changes
    console.log('handle login')
    this.actions.AttemptLogin({ username: this.state.username, password: this.state.password })
    this.props.history.push('/')
  }

  attemptRegister () {
    // something will happen here
    console.log('handle register')
  }

  // TODO: what's the deal with button onSubmit?
  // TODO: move theme to top level app/router/index
  render () {
    const { classes } = this.props
    return (
      <ThemeProvider theme={theme}>
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
                  onClick={(e) => { this.setState({ tryRegister: false }) }}
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
                    this.setState({ username: event.target.value })
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
                      this.setState({ tryRegister: true })
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
      </ThemeProvider>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const loginState = state.login
  return {
    isLoggedIn: loginState.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Login))))
