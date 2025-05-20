import React from 'react';
import { User, Edit2 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
}

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-primary-green/10 rounded-xl p-4 border border-primary-green/30">
      <div className="flex items-center">
        <div className="bg-primary-green/20 p-3 rounded-full mr-4">
          <User size={28} className="text-primary-green" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <button className="text-primary-green hover:text-primary-green/80 transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
          <p className="text-sm text-white/70">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-white/70 mb-1">Weight</p>
          <p className="font-semibold">{user.weight} kg</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-white/70 mb-1">Height</p>
          <p className="font-semibold">{user.height} cm</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-white/70 mb-1">Age</p>
          <p className="font-semibold">{user.age} yrs</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;