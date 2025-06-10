
import React from 'react';
import { Shield, FileText, Settings } from 'lucide-react';

export const PolicyManager = () => {
  const policies = [
    { name: 'Zero-Trust Workload Policy', status: 'active', workloads: 23, lastUpdated: '2h ago' },
    { name: 'JA4+ Anomaly Detection', status: 'active', workloads: 47, lastUpdated: '4h ago' },
    { name: 'SPIFFE Identity Validation', status: 'updating', workloads: 47, lastUpdated: '1m ago' },
    { name: 'Network Segmentation Policy', status: 'active', workloads: 12, lastUpdated: '6h ago' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        Zero-Trust Policy Manager
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Shield className="h-5 w-5 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">4</div>
          <div className="text-xs text-gray-400">Active Policies</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Settings className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">47</div>
          <div className="text-xs text-gray-400">Protected Workloads</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <FileText className="h-5 w-5 text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">1</div>
          <div className="text-xs text-gray-400">Updating</div>
        </div>
      </div>

      <div className="space-y-3">
        {policies.map((policy, index) => (
          <div key={index} className="bg-gray-900 rounded p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-200">{policy.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                policy.status === 'active' ? 'bg-green-900 text-green-400' :
                policy.status === 'updating' ? 'bg-amber-900 text-amber-400' :
                'bg-red-900 text-red-400'
              }`}>
                {policy.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{policy.workloads} workloads</span>
              <span>Updated {policy.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
