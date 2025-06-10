
import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const AlertPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Anomalous JA4+ fingerprint detected from 192.168.1.45',
      timestamp: '14:23:15',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'error',
      message: 'SPIFFE workload attestation failed for service: api-gateway',
      timestamp: '14:20:32',
      severity: 'high'
    },
    {
      id: 3,
      type: 'success',
      message: 'Zero-trust policy successfully applied to new workload',
      timestamp: '14:18:44',
      severity: 'low'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-cyan-400">Security Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-900 rounded border border-gray-600">
            <div className="flex items-center space-x-3">
              {getIcon(alert.type)}
              <span className="text-sm text-gray-200">{alert.message}</span>
            </div>
            <span className="text-xs text-gray-400 font-mono">{alert.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
