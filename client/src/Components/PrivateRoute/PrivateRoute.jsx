import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userRole = sessionStorage.getItem('userRole');

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;