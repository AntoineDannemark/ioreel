import { ReactComponent } from './react-app-env.d';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute: React.VFC = ({ component: Component, dbType, ...rest }: { component: ReactComponent; dbType: string }) => {
  
    return (
    <Route {...rest} render={
      props => {
        if (dbType) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/unauthorized',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;