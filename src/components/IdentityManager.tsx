
import React from 'react';
import { UserCheck, Key, Shield } from 'lucide-react';

export const IdentityManager = () => {
  const identities = [
    { spiffeId: 'spiffe://example.org/web-frontend', status: 'verified', lastSeen: '2m ago' },
    { spiffeId: 'spiffe://example.org/api-gateway', status: 'expired', lastSeen: '15m ago' },
    { spiffeId: 'spiffe://example.org/database', status: 'verified', lastSeen: '1m ago' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center">
        <UserCheck className="h-6 w-6 mr-2" />
        Identity Manager
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Key className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">47</div>
          <div className="text-xs text-gray-400">Active IDs</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Shield className="h-5 w-5 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">44</div>
          <div className="text-xs text-gray-400">Verified</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-300">Recent Activity</h3>
        {identities.map((identity, index) => (
          <div key={index} className="bg-gray-900 rounded p-3 border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs px-2 py-1 rounded ${
                identity.status === 'verified' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
              }`}>
                {identity.status.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">{identity.lastSeen}</span>
            </div>
            <div className="text-xs font-mono text-cyan-300 break-all">{identity.spiffeId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
