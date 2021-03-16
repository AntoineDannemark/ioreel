// https://github.com/elylucas/ionic-react-protected-route

import React, { useEffect, useContext } from "react";

import { Route, Redirect } from "react-router";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    console.log(
      `loading protected route '${path}' with component ${Component.name}`
    );
  }, [Component, path]);
};
