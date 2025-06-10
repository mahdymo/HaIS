
import React, { useState, useEffect } from 'react';
import { Activity, Network, Eye } from 'lucide-react';

export const JA4Collector = () => {
  const [packets, setPackets] = useState(0);
  const [fingerprints, setFingerprints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => prev + Math.floor(Math.random() * 10) + 1);
      setFingerprints(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const recentFingerprints = [
    { id: 1, ja4: 't13d1516h2_8daaf6152771_b0da82dd1658', source: '10.0.1.25', risk: 'low' },
    { id: 2, ja4: 't13d1517h2_9ebbf7263882_c1eb93ee2769', source: '192.168.1.45', risk: 'medium' },
    { id: 3, ja4: 't13d1518h2_afccf8374993_d2fc04ff3870', source: '10.0.2.33', risk: 'high' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 flex items-center">
          <Network className="h-6 w-6 mr-2" />
          JA4+ Fingerprint Collector
        </h2>
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-400 animate-pulse" />
          <span className="text-sm text-green-400">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 rounded p-4 border border-gray-600">
          <div className="text-2xl font-bold text-cyan-400 font-mono">{packets.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Packets Analyzed</div>
        </div>
        <div className="bg-gray-900 rounded p-4 border border-gray-600">
          <div className="text-2xl font-bold text-green-400 font-mono">{fingerprints}</div>
          <div className="text-sm text-gray-400">Unique Fingerprints</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center">
          <Eye className="h-4 w-4 mr-2" />
          Recent Fingerprints
        </h3>
        {recentFingerprints.map((fp) => (
          <div key={fp.id} className="bg-gray-900 rounded p-3 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-gray-300">{fp.source}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                fp.risk === 'high' ? 'bg-red-900 text-red-400' :
                fp.risk === 'medium' ? 'bg-amber-900 text-amber-400' :
                'bg-green-900 text-green-400'
              }`}>
                {fp.risk.toUpperCase()}
              </span>
            </div>
            <div className="text-xs font-mono text-cyan-300 break-all">{fp.ja4}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
