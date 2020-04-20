import { combineReducers } from 'redux'

const loginReducer = (loginState = {}, action) => {
  // fill me out
  loginState.isLoggedIn = false;
  return loginState
}

export default combineReducers({loginReducer})