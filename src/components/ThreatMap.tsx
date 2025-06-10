
import React from 'react';
import { MapPin, AlertTriangle, Globe } from 'lucide-react';

export const ThreatMap = () => {
  const threats = [
    { location: 'US East', count: 3, severity: 'medium' },
    { location: 'EU West', count: 1, severity: 'high' },
    { location: 'Asia Pacific', count: 7, severity: 'low' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center">
        <Globe className="h-6 w-6 mr-2" />
        Threat Geography
      </h2>

      <div className="mb-6">
        <div className="bg-gray-900 rounded p-4 border border-gray-600 text-center">
          <AlertTriangle className="h-8 w-8 text-amber-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-400 font-mono">11</div>
          <div className="text-sm text-gray-400">Active Threats</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">Regional Distribution</h3>
        {threats.map((threat, index) => (
          <div key={index} className="bg-gray-900 rounded p-3 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-gray-200">{threat.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-white">{threat.count}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  threat.severity === 'high' ? 'bg-red-900 text-red-400' :
                  threat.severity === 'medium' ? 'bg-amber-900 text-amber-400' :
                  'bg-green-900 text-green-400'
                }`}>
                  {threat.severity.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
