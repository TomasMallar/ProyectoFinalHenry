import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PaymentApprovedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionStatus = queryParams.get('collection_status');

  const paymentSuccessful = collectionStatus === 'approved';



  return (
    <Route
      {...rest}
      render={(props) =>
        paymentSuccessful ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PaymentApprovedRoute;
