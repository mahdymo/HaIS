
import React from 'react';
import { Server, Users, Key, CheckCircle, XCircle } from 'lucide-react';

export const SpireStatus = () => {
  const components = [
    { name: 'SPIRE Server', status: 'online', icon: Server, count: 1 },
    { name: 'SPIRE Agents', status: 'online', icon: Users, count: 12 },
    { name: 'Workload Entries', status: 'online', icon: Key, count: 47 }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6">SPIRE Infrastructure</h2>
      
      <div className="space-y-4">
        {components.map((component) => {
          const Icon = component.icon;
          return (
            <div key={component.name} className="bg-gray-900 rounded p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-medium text-gray-200">{component.name}</span>
                </div>
                {component.status === 'online' ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="text-lg font-bold text-white font-mono">{component.count}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="text-sm text-gray-400">Last Sync</div>
        <div className="text-sm font-mono text-cyan-400">2024-06-10 14:25:33 UTC</div>
      </div>
    </div>
  );
};
