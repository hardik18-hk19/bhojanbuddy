import React from 'react';
import { Smartphone, Check } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  connected: boolean;
  icon: string;
}

interface DeviceConnectCardProps {
  device: Device;
}

const DeviceConnectCard: React.FC<DeviceConnectCardProps> = ({ device }) => {
  return (
    <div className="bg-forest-green border border-primary-green/20 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className={`${device.connected ? 'bg-primary-green/20' : 'bg-white/10'} p-2 rounded-lg mr-3`}>
          <Smartphone size={20} className={device.connected ? 'text-primary-green' : 'text-white/70'} />
        </div>
        <div>
          <h3 className="font-medium">{device.name}</h3>
          <p className="text-sm text-white/70">
            {device.connected ? 'Connected' : 'Not connected'}
          </p>
        </div>
      </div>
      
      {device.connected ? (
        <div className="bg-primary-green/20 p-1 rounded-full">
          <Check size={16} className="text-primary-green" />
        </div>
      ) : (
        <button className="bg-white/10 text-white text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-white/15 transition-colors">
          Connect
        </button>
      )}
    </div>
  );
};

export default DeviceConnectCard;