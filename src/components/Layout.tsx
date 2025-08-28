import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-white mb-2 drop-shadow-lg">
            🎯 ACTIV System
          </h1>
          <p className="text-center text-white/90 text-lg drop-shadow">
            Volunteer Hub Organization
          </p>
        </header>
        
        <Navigation />
        
        <main>
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;