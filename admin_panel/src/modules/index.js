import { combineReducers } from 'redux'
import authReducer from './auth'
import articlesReducer from './articles'

export default combineReducers({
  authReducer,
  articlesReducer
})
