
import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import loadable from '@loadable/component'

import Loading from '../components/Common/Loading'

const Admin = loadable(() => import('../containers/Layout/Admin'), {
  fallback: <Loading />
})

const Dashboard = loadable(() => import('../containers/View/Dashboard'), {
  fallback: <Loading />
})

const Profile = loadable(() => import('../containers/View/Profile'), {
  fallback: <Loading />
})

const Login = loadable(() => import('../containers/View/Login'), {
  fallback: <Loading />
})

const NotFound = loadable(() => import('../containers/View/NotFound'), {
  fallback: <Loading />
})


const RouterMain = () => {
  // TODO - El / puede ser login directamente
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/login" />} />
        <Route path="/login" exact component={Login} />
        <Route path="/404" exact component={NotFound} />
        <Route path="/admin/:path?" exact>
          <Admin>
            <Switch>
              <Route path="/admin/dashboard" exact component={Dashboard} />
              <Route path="/admin/profile" exact component={Profile} />
              <Route component={() => <Redirect to="/404" />} />
            </Switch>
          </Admin>
        </Route>
        <Route component={() => <Redirect to="/404" />} />
      </Switch>
    </Router>
  );
}

export default RouterMain