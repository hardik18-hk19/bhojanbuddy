import React from 'react';
import { Apple, Coffee, Beef, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface HealthTipProps {
  tip: Tip;
}

const HealthTip: React.FC<HealthTipProps> = ({ tip }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'protein':
        return <Beef size={20} className="text-primary-green" />;
      case 'sugar':
        return <Coffee size={20} className="text-primary-green" />;
      case 'vegetables':
        return <Apple size={20} className="text-primary-green" />;
      default:
        return <Apple size={20} className="text-primary-green" />;
    }
  };

  return (
    <div className="bg-forest-green border border-primary-green/20 rounded-xl p-4">
      <div className="flex items-start">
        <div className="bg-primary-green/20 p-2 rounded-lg mr-3 flex-shrink-0">
          {getIcon(tip.icon)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{tip.title}</h3>
          <p className="text-sm text-white/80">{tip.description}</p>
          
          <div className="flex items-center justify-end mt-3">
            <button className="text-white/60 hover:text-white transition-colors mr-3">
              <ThumbsUp size={16} />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <ThumbsDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTip;