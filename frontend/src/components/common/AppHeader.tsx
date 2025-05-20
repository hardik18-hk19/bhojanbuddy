import React from 'react';
import { Leaf } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AppHeader = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/upload':
        return 'Upload Meal';
      case '/nutrition':
        return 'Nutrition Summary';
      case '/suggestions':
        return 'Suggestions';
      case '/profile':
        return 'Profile';
      default:
        return 'BhojanBuddy';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-forest-green border-b border-primary-green/20">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Leaf className="text-primary-green mr-2" size={24} />
          <h1 className="text-xl font-bold text-white">
            <span className="text-primary-green">Bhojan</span>Buddy
          </h1>
        </div>
        <div className="text-right">
          <h2 className="text-sm font-medium text-white/80">{getPageTitle()}</h2>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;