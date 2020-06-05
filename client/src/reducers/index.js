import {
  SET_AUTH,
  SET_USER,
  CHANGE_FORM,
  SENDING_REQUEST,
  LOADING_AUTH,
  SET_ERROR_MESSAGE,
  SET_DATA
} from 'constants/AppConstants'

const initialState = {
  formState: {
    email: '',
    password: ''
  },
  currentlySending: false,
  loadingAuth: false,
  login: {
    isLoggedIn: false
  },
  user: {
    firstName: '',
    lastName: '',
    email: ''
  },
  errorMessage: '',
  data: {
    group: '',
    ledger: ''
  }
}

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      return changeForm(state, action)
    case SET_AUTH:
      return setAuth(state, action)
    case SET_USER:
      return setUser(state, action)
    case SENDING_REQUEST:
      return sendingRequest(state, action)
    case LOADING_AUTH:
      return loadingAuth(state, action)
    case SET_ERROR_MESSAGE:
      return setErrorMessage(state, action)
    case SET_DATA:
      return setData(state, action)
    default:
      return state
  }
}

const changeForm = (state, action) => {
  return {
    ...state,
    formState: {
      ...state.formState,
      ...action.newState
    }
  }
}

const setAuth = (state, action) => {
  return {
    ...state,
    login: {
      isLoggedIn: action.newState
    }
  }
}

const setUser = (state, action) => {
  return {
    ...state,
    user: action.user
    // user: {
    //   ...state.data,
    //   ...action.data
    // }
  }
}

const sendingRequest = (state, action) => {
  return {
    ...state,
    currentlySending: action.sending
  }
}

const loadingAuth = (state, action) => {
  return {
    ...state,
    loadingAuth: action.sending
  }
}

const setErrorMessage = (state, action) => {
  return {
    ...state,
    errorMessage: action.message
  }
}

const setData = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      ...action.data
    }
  }
}
