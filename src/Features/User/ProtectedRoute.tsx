// Route handling redirects in case the user is not authenticated or has no dbType set
// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a

import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  hasApiEndpoint: boolean;
  getApiEndpointPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  let redirectPath = "";

  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (props.isAuthenticated && !props.hasApiEndpoint) {
    redirectPath = props.getApiEndpointPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
