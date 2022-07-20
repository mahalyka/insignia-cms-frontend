import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import rootReducer from '../_reducers'
import requestMiddleware from './requestMiddleware'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production'
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware, requestMiddleware, promise)
)
