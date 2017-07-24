import React from 'react';

import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
//import NeedsAuthentication from './containers/AuthenticationContainer';

export default (
  <Switch>
    <Route path="login" component={LoginPage}/>
    {
      // We should abstract this second switch out into it's own componen
    }
    <Route exact path="/" component={App}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route path="/form" component={FormPage}/>
    <Route path="/table" component={TablePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Switch>
);
