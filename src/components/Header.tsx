
import React from 'react';
import { Shield, Activity, AlertTriangle, TestTube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <Link to="/" className="text-xl font-bold hover:text-cyan-400 transition-colors">
            HaIS Platform
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm transition-colors ${
              location.pathname === '/' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/testing" 
            className={`flex items-center space-x-1 text-sm transition-colors ${
              location.pathname === '/testing' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            <TestTube className="h-4 w-4" />
            <span>Testing</span>
          </Link>
        </nav>
        
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
