import React from 'react';

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
