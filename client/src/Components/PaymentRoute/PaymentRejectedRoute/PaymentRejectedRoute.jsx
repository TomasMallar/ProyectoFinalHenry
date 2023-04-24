import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PaymentRejectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionStatus = queryParams.get('collection_status');

  const paymentRejected = collectionStatus === 'rejected';

  return (
    <Route
      {...rest}
      render={(props) =>
        paymentRejected ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PaymentRejectedRoute;
