import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Favorites from './Favorites';

export default function Wrapper ({ children }) {
  const location = useLocation();

  const hiddenRoutes = ['/', '/ConfirmAge'];

  return (
    <div>
      {location.pathname !== '/' && <NavBar />}
      {!hiddenRoutes.includes(location.pathname) && <Favorites />}
      {children}
    </div>
  );
};
