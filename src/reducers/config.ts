import { routerMiddleware } from "connected-react-router"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}


export { 
  middlewares,
  history
};