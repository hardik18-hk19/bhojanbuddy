import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-primary-green/10 border border-primary-green/30 rounded-xl p-4 hover:bg-primary-green/15 transition-colors duration-200">
      <div className="text-primary-green mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
};

export default FeatureCard;