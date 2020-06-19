import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './userDucks'
import administratorsReducer from './administratorsDucks'

const rootReducer = combineReducers({
  user: userReducer,
  administrators: administratorsReducer
})

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)

  middlewares.push(logger)
}


const generateStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)))
  return store
}

export type RootState = ReturnType<typeof rootReducer>;

export default generateStore