import React from 'react';
import { Navigate } from 'react-router-dom';

const ControlAutenticacion = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('idUsuario'); // Verifica si el usuario está autenticado

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ControlAutenticacion;