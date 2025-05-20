import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, LineChart, Lightbulb, User } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/upload', icon: Camera, label: 'Upload' },
    { path: '/nutrition', icon: LineChart, label: 'Nutrition' },
    { path: '/suggestions', icon: Lightbulb, label: 'Tips' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-forest-green border-t border-primary-green/20 px-2 py-1 z-50">
      <div className="max-w-md mx-auto">
        <ul className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <li key={item.path} className="flex-1">
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 ${
                    isActive ? 'text-vibrant-yellow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <IconComponent size={20} className={isActive ? 'animate-pulse-subtle' : ''} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavigation;