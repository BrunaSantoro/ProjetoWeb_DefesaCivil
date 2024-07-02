import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = React.useContext(AuthContext);
  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;