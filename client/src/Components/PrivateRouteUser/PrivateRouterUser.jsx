import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteUser = ({ component: Component, ...rest }) => {
  const userRole = localStorage.getItem('userRole');
  console.log("ACA TENDRIA QUE LLEGAR EL MISMO NRO DE ROL",userRole)

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === '1' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRouteUser;