import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface ProfileMenuItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="border-t first:border-t-0 border-primary-green/20">
      <button className="w-full p-4 flex items-center justify-between text-left">
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-white/70">{subtitle}</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-primary-green" />
      </button>
    </div>
  );
};

export default ProfileMenuItem;