import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  redirectAction: routerActions.replace,
  authenticatedSelector: state => state.authReducer.user !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: authData => authData.isAuthenticated
})

export const VisibileOnlyAdmin = connectedAuthWrapper({
  authenticatedSelector: state => state.authReducer.user !== null && state.authReducer.user.type === 'admin',
  wrapperDisplayName: 'VisibleOnlyAdmin'
})

export const VisibleOnlyLogged = connectedAuthWrapper({
  authenticatedSelector: state => state.authReducer.user !== null,
  wrapperDisplayName: 'VisibleOnlyLogged'
})

export const isAdmin = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  authenticatedSelector: state => state.authReducer.user !== null && state.authReducer.user.type === 'admin',
  wrapperDisplayName: 'isAdmin'
})

export const isGuest = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  authenticatedSelector: state => state.authReducer.user === null,
  wrapperDisplayName: 'isGuest'
})

export const isLoggedIn = connectedRouterRedirect({
  redirectPath: '/products',
  allowRedirectBack: false,
  redirectAction: routerActions.replace,
  authenticatedSelector: state => state.authReducer.user === null,
  wrapperDisplayName: 'isLoggedIn'
})