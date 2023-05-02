import { Route, Redirect } from 'react-router-dom';

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login"}} />
        )
      }
    />
  );
}
