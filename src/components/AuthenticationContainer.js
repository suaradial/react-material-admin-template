import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log("PROPS", isAuthenticated);
  return (<Route {...rest} render={props => (
      isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>);
};

export default PrivateRoute;