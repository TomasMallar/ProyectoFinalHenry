import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import axios from "axios";
import jwtDecode from 'jwt-decode';

const PaymentApprovedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionStatus = queryParams.get('collection_status');

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id

  const paymentSuccessful = collectionStatus === 'approved';

  localStorage.setItem("cartItems", JSON.stringify([]));
  axios.post(`http://localhost:3001/cart/${id}`, {cartItems: []});

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
