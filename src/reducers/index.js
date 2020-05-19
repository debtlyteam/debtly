import { combineReducers } from 'redux'

const loginReducer = (loginState = {}, action) => {
  // fill me out
  switch (action.type) {
    case 'LOGIN':
      loginState.isLoggedIn = true
      break
    default:
      loginState.isLoggedIn = false
      break
  }
  return loginState
}

asdas

export default combineReducers({ login: loginReducer })
