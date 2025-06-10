
import React from 'react';
import { Shield, Activity, AlertTriangle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <span className="text-xl font-bold">MIS Platform</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-400" />
            <span className="text-sm text-gray-300">System Healthy</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span className="text-sm text-gray-300">3 Alerts</span>
          </div>
          
          <div className="text-sm text-gray-400 font-mono">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
};
