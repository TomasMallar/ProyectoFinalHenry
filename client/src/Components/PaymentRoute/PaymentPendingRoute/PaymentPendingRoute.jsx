import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PaymentPendingRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionStatus = queryParams.get('collection_status');

  const paymentPending = collectionStatus === 'pending';

  return (
    <Route
      {...rest}
      render={(props) =>
        paymentPending ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PaymentPendingRoute;
