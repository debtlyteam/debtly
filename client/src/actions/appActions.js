import {
  SET_AUTH,
  SET_USER,
  CHANGE_FORM,
  SENDING_REQUEST,
  LOADING_AUTH,
  SET_ERROR_MESSAGE,
  SET_DATA
} from '../constants/AppConstants'

export const login = (email, password) => {
  return dispatch => {
    dispatch(sendingRequest(true))
    dispatch(setErrorMessage(''))
    return fetch('/api/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then(data => {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(true))
        dispatch(loadMe())
      })
      .catch(error => {
        // TODO: update me
        console.log(error)
        dispatch(sendingRequest(false))
        dispatch(setErrorMessage('Login failed'))
      })
  }
}

export const register = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(sendingRequest(true))
    dispatch(setErrorMessage(''))
    return fetch('/api/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then(data => {
        dispatch(sendingRequest(false))
        if (!data.isRegistered) {
          console.log('Failed to register!')
          dispatch(setErrorMessage('Failed to register, email in use'))
        }
      })
      .catch(error => {
        // TODO update me
        console.log(error)
        dispatch(sendingRequest(false))
        dispatch(setErrorMessage('Register failed unexpectedly'))
      })
  }
}

export const loadData = (path, name) => {
  return dispatch => {
    dispatch(setData({ [name]: '' }))
    dispatch(sendingRequest(true))
    dispatch(setErrorMessage(''))
    return api(`/api${path}`)
      .then(data => {
        dispatch(sendingRequest(false))
        dispatch(setData({ [name]: data }))
      })
      .catch(error => {
        dispatch(sendingRequest(false))
        dispatch(setErrorMessage('Error loading data'))
        if (error.message === '401') {
          dispatch(setAuthState(false))
        }
      })
  }
}

export const loadMe = () => {
  return dispatch => {
    dispatch(loadingAuth(true))
    dispatch(setErrorMessage(''))
    return api('/api/loadme')
      .then(data => {
        dispatch(loadingAuth(false))
        dispatch(setAuthState(data.isLoggedIn))
        dispatch(setUser(data.user))
      })
      .catch(error => {
        // TODO: update me
        console.log(error)
        dispatch(loadingAuth(false))
      })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(sendingRequest(true))
    dispatch(setErrorMessage(''))
    return api('/api/logout')
      .then(data => {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(data.isLoggedIn))
      })
      .catch(error => {
        // TODO: update me
        console.log(error)
        dispatch(sendingRequest(false))
        dispatch(setErrorMessage('Error logging out'))
      })
  }
}

export const setErrorMessage = message => {
  return { type: SET_ERROR_MESSAGE, message }
}

export const changeForm = newState => {
  return { type: CHANGE_FORM, newState }
}

const setAuthState = newState => {
  return { type: SET_AUTH, newState }
}

const setUser = user => {
  return { type: SET_USER, user }
}

const sendingRequest = sending => {
  return { type: SENDING_REQUEST, sending }
}

const loadingAuth = sending => {
  return { type: LOADING_AUTH, sending }
}

const setData = data => {
  return { type: SET_DATA, data }
}

const api = path => {
  return fetch(path, { credentials: 'same-origin' }).then(res => {
    if (res.ok) return res.json()
    else throw new Error(res.status)
  })
}

export default api
