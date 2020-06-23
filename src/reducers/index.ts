import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux'
import { History } from 'history'
import { connectRouter, RouterState } from 'connected-react-router'
import { middlewares, history } from './config'
import { UserState } from './userDucks'
import { AdministratorsState } from './administratorsDucks'

import userReducer from './userDucks'
import administratorsReducer from './administratorsDucks'


export type RootState = Readonly<{
  router: RouterState;
  user: UserState;
  administrators: AdministratorsState;
}>;

const rootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    user: userReducer,
    administrators: administratorsReducer,
  });

const generateStore = (): Store<RootState>  => {
  const store = createStore(rootReducer(history), compose(applyMiddleware(...middlewares)))
  if (module.hot) {
    module.hot.accept("./", () => {
      store.replaceReducer(rootReducer(history))
    });
  }

  return store
}

export default generateStore