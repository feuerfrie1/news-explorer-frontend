import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  function redirectToLogin() {
    props.handleLoginPopup();
    return (
      <Redirect to="./" />
    );
  }
  return (
    <Route>
      {
        () => localStorage.getItem('token') ? <Component {...props} /> : redirectToLogin()
      }
    </Route>
  );
}

export default ProtectedRoute;