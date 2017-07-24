import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './containers/LoginPage';
import ResetPasswordPage from './containers/ResetPasswordPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import PrivateRoute from './components/AuthenticationContainer';

const Routes = (props) => (
  <Switch>
    <Route path="/login" render={routeProps => <LoginPage {...routeProps} handleAuthenticationUpdate={props.handleAuthenticationUpdate}/>}/>
    <PrivateRoute exact path="/" component={Dashboard} isAuthenticated={props.userIsAuthenticated} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={props.userIsAuthenticated} />
    <PrivateRoute path="/form" component={ResetPasswordPage} isAuthenticated={props.userIsAuthenticated} />
    <PrivateRoute path="/table" component={TablePage} isAuthenticated={props.userIsAuthenticated} />
    <PrivateRoute path="*" component={NotFoundPage} isAuthenticated={props.userIsAuthenticated} />
  </Switch>
)

export default Routes;