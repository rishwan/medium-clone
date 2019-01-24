import api from '../lib/api'
import { push } from 'react-router-redux'

// ----------------------------
// Constants
// ----------------------------
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
// const LOGIN_REFRESH_TOKEN = 'LOGIN_REFRESH_TOKEN'
// const LOGIN_REFRESH_TOKEN_SUCESS = 'LOGIN_REFRESH_TOKEN_SUCESS'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
// const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

// ----------------------------
//  Actions
// ----------------------------


function requestLogin (creds) {
  console.log('authReducer: requestLogin called.')
  return {
    type: LOGIN_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      user: { username: creds.username},
      authFlag: true,
      authMessage: 'Verifying...'
    }
  }
}

function loginError (message) {
  console.log('authReducer: loginError action called')
  return {
    type: LOGIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      authFlag: false,
      authMessage: message,
      authMessageClass: 'red'
    }
  }
}

function loginSuccess (user, token, tokenExpiry) {
  console.log('authReducer: loginSuccess action called')
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      token: token,
      tokenExpiry: tokenExpiry,
      user: user
    }
  }
}

function requestLogout () {
  return {
    type: LOGOUT_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: true
    }
  }
}

export function receiveLogout () {
  console.log('authReducer: logout action called')
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: false
    }
  }
}

export function loginUser (creds, redirect = '/') {
  console.log('loginUser action called')

  console.log(creds);

  return dispatch => {
    dispatch(requestLogin(creds))

    api
      .post('login', { email: creds.email, password: creds.password})
      .then(response => {
        if (response.data.status === 'ok') {
          console.log(response.data.result)

          api.setAuthToken(response.data.result.access_token)
          localStorage.setItem('id_token', response.data.result.access_token)
          localStorage.setItem('user', JSON.stringify(response.data.result.user))

          let expireTime = new Date()
          expireTime.setSeconds(expireTime.getSeconds() + response.data.result.expires_in)

          localStorage.setItem('token_expiry', expireTime)

          dispatch(loginSuccess(response.data.result.user, response.data.result.token, expireTime))

          dispatch(push('/article/list'))

          console.log('login ok')
        } else {
          console.log('invalid credentials')
        }
      })
      .catch(error => {
        console.log('*** api error ***')
        console.log(error.status)
        console.log(error)
        // console.log(error.response.data);
        console.log('*** eof. api error ***')

        if (error.status === 401) {
          dispatch(loginError({
            body: 'Invalid credentials'
          }))
        } else {
          dispatch(loginError({
            body: 'We are unable to log you in at this time..'
          }))
        }
      })
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout())

    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
    localStorage.removeItem('token_expiry')

    dispatch(receiveLogout())

    dispatch(push('/login'))
  }
}

// ----------------------------
//  Reducer
// ----------------------------

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpiry: null,
  authFlag: false,
  authMessage: '',
  authMessageClass: null
}

function loadPreviousState () {
  let userState = localStorage.getItem('user')
  let isAuthenticatedState = localStorage.getItem('id_token')
  let tokenExpiry = localStorage.getItem('token_expiry')
  api.setAuthToken(isAuthenticatedState)

  return {
    isFetching: false,
    isAuthenticated: !!isAuthenticatedState,
    user: userState ? JSON.parse(userState) : null,
    token: isAuthenticatedState,
    tokenExpiry: tokenExpiry ? new Date(tokenExpiry) : null,
    authFlag: false,
    authMessage: ''
  }
}

export default function authReducer (state = loadPreviousState(), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        authMessage: action.authMessage
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        authFlag: false,
        authMessage: action.payload.authMessage,
        authMessageClass: action.payload.authMessageClass
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.payload.user,
        token: action.payload.token,
        tokenExpiry: action.payload.tokenExpiry
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
