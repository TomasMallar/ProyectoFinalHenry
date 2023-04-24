import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userRole = sessionStorage.getItem('userRole');
  console.log("ACA TENDRIA QUE LLEGAR EL MISMO NRO DE ROL",userRole)

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === '2' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;