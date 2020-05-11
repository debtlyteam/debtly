import React, { Component } from 'react'
import { Button, TextField, ThemeProvider, CssBaseline, Container, withStyles, Avatar, Typography, Box, Collapse, Icon, Grid, Fade, IconButton, FormControl, InputLabel, Input, InputAdornment, OutlinedInput } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../components/Actions'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import theme from './Theme'
import clsx from 'clsx'

const styles = theme => (
  {
  header: {
    display: 'flex'
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    alignItems: 'center',
    // update my colour
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  login: {
    margin: theme.spacing(0.5, 0),
    marginTop: 10
  },
  margin :{
    margin: theme.spacing(1),
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
    margin: '6px 0px',
  }
})

class Login extends Component {
  constructor (props) {
    super(props)
    this.actions = props.actions
    this.state = {
      username: '',
      password: '',
      tryRegister: false,
      showPassword: false,
    }
  }

  static get propTypes () {
    return {
      actions: PropTypes.object,
      history: PropTypes.object
    }
  }

  handleLoginButtonClick (event) {
    // we can do backend login attempt here or in the reducer, although it feels like this is a better place for it since the reducer should primarily take care of state changes
    this.actions.AttemptLogin({ username: this.state.username, password: this.state.password })
    this.props.history.push('/')
  }

  // TODO: what's the deal with button onSubmit?
  // TODO: move theme to top level app/router/index
  render () {
    const { classes } = this.props
    console.log(theme)
    return (
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <Box className={classes.box}
            border={1}>
            <CssBaseline/>
            <Grid className={classes.header}
              direction='row-reverse'>
              <Fade in={this.state.tryRegister}>
              <IconButton
                onClick={(e) => { this.setState({tryRegister : false}) }}
                >
                <CloseIcon/>
              </IconButton>
              </Fade>
            </Grid>

            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpenIcon/>
              </Avatar>
              <Typography component='h1' variant='h5'>
                {this.state.tryRegister ? 'Register' : 'Login'}
              </Typography>
              <form className={classes.form}
                onSubmit={(e) => {
                  this.handleLoginButtonClick(e)
                }}>
                <Collapse in={this.state.tryRegister}>
                  <TextField
                    className={classes.textEntry}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='Enter your Name'
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
                <FormControl
                // className={clsx(classes.margin, classes.textEntry)}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    className={classes.textEntry}
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
            // value={this.state.password}
            onChange={(event) => {
                    this.setState({ password: event.target.value })
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
                  />
                </FormControl>
                <TextField
                  className={classes.textEntry}
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  label='Enter your Password'
                  name='password'
                  autoComplete='password'
                  onChange = {(event) => {
                    this.setState({ password: event.target.value })
                  }}
                  InputProps={{
                    endAdornment:
                      <IconButton
                        aria-label="toggle password visibility"
                      >

                      </IconButton>
                  }}
                />
                <Button
                  className={classes.login}
                  type="submit"
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
                  onClick={(e) => { this.setState({ tryRegister: true }) }}
                >
            Register
                </Button>
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
