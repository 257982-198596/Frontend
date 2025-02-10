import React from 'react';
import { Navigate } from 'react-router-dom';

const ControlAutenticacion = ({ children }) => {
  // Verifica si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('idUsuario'); 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ControlAutenticacion;