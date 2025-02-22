import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  return Cookies.get('token') ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
