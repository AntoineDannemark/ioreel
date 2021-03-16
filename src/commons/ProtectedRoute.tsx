// https://github.com/elylucas/ionic-react-protected-route

import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";
import { useTypedSelector } from "../app/store";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
  exact,
}) => {
  const { isAuthenticated, endpoint } = useTypedSelector((state) => state.user);

  useEffect(() => {
    console.log(
      `loading protected route '${path}' with component ${Component.name}`
    );
  }, [Component, path]);

  let redirectPath = "";

  if (!isAuthenticated) {
    redirectPath = "/login";
  } else if (!endpoint) {
    redirectPath = "/endpoint";
  }

  return (
    <Route
      path={path}
      render={() =>
        !redirectPath ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: redirectPath }} />
        )
      }
      exact={exact}
    />
  );
};
