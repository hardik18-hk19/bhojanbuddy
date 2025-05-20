import React, { useState } from 'react';
import { User, Settings, Bell, BookOpen, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';
import DeviceConnectCard from '../components/profile/DeviceConnectCard';

const ProfilePage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [healthGoalExpanded, setHealthGoalExpanded] = useState(false);
  
  // Mock user data
  const user = {
    name: "Priya Sharma",
    email: "priya@example.com",
    weight: 62,
    height: 165,
    age: 28,
    goal: "Eat healthier and maintain weight"
  };
  
  // Mock connected devices
  const connectedDevices = [
    { id: 1, name: "Google Fit", connected: true, icon: "google" },
    { id: 2, name: "Apple Health", connected: false, icon: "apple" },
    { id: 3, name: "Fitbit", connected: false, icon: "fitbit" }
  ];

  return (
    <div className="py-6 space-y-6">
      <ProfileCard user={user} />
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
        
        <div className="bg-forest-green border border-primary-green/20 rounded-xl overflow-hidden">
          <button
            onClick={() => setHealthGoalExpanded(!healthGoalExpanded)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div>
              <h3 className="font-medium">My Current Goal</h3>
              <p className="text-sm text-white/70">{user.goal}</p>
            </div>
            <ChevronRight 
              size={20} 
              className={`text-primary-green transition-transform duration-200 ${
                healthGoalExpanded ? 'rotate-90' : ''
              }`} 
            />
          </button>
          
          {healthGoalExpanded && (
            <div className="p-4 border-t border-primary-green/20 animate-fadeIn">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Daily Calorie Target</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="1200" 
                      max="3000" 
                      value="2000" 
                      className="w-full h-2 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant-yellow"
                    />
                    <span className="ml-3 text-sm font-medium">2000 kcal</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-white/70 mb-1">Protein Goal</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="40" 
                      max="200" 
                      value="80" 
                      className="w-full h-2 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant-yellow"
                    />
                    <span className="ml-3 text-sm font-medium">80g</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button className="bg-primary-green text-white font-medium py-2 px-4 rounded-lg text-sm w-full hover:bg-primary-green/90 transition-colors">
                    Update Goals
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
        <div className="space-y-3">
          {connectedDevices.map(device => (
            <DeviceConnectCard key={device.id} device={device} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="bg-forest-green border border-primary-green/20 rounded-xl overflow-hidden">
          <ProfileMenuItem 
            icon={<Settings size={20} />}
            title="Account Settings"
            subtitle="Update your profile information"
          />
          
          <div className="border-t border-primary-green/20 p-4 flex items-center justify-between">
            <div className="flex items-center">
              {isDark ? <Moon size={20} className="mr-3" /> : <Sun size={20} className="mr-3" />}
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-white/70">Switch appearance</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDark}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
            </label>
          </div>
          
          <ProfileMenuItem 
            icon={<Bell size={20} />}
            title="Notifications"
            subtitle="Manage app notifications"
          />
          
          <ProfileMenuItem 
            icon={<BookOpen size={20} />}
            title="Help Center"
            subtitle="FAQ and support resources"
          />
        </div>
      </section>
      
      <button className="w-full flex items-center justify-center text-white/80 py-4 hover:text-white transition-colors">
        <LogOut size={18} className="mr-2" />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default ProfilePage;