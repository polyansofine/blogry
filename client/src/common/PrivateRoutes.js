import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",

            // eslint-disable-next-line react/prop-types
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
