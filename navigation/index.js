import React from 'react';
import { AuthProvider } from '../lib/AuthProvider.js';
import Routes from './Routes';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;