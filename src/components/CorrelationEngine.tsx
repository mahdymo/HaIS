
import React from 'react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';

export const CorrelationEngine = () => {
  const correlations = [
    { type: 'Behavioral Anomaly', confidence: 87, threat: 'Medium' },
    { type: 'Identity Mismatch', confidence: 95, threat: 'High' },
    { type: 'Traffic Pattern', confidence: 72, threat: 'Low' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center">
        <Brain className="h-6 w-6 mr-2" />
        Correlation Engine
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Processing Rate</span>
          <TrendingUp className="h-4 w-4 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-green-400 font-mono">1,247/sec</div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">Active Correlations</h3>
        {correlations.map((corr, index) => (
          <div key={index} className="bg-gray-900 rounded p-3 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-200">{corr.type}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                corr.threat === 'High' ? 'bg-red-900 text-red-400' :
                corr.threat === 'Medium' ? 'bg-amber-900 text-amber-400' :
                'bg-green-900 text-green-400'
              }`}>
                {corr.threat}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${corr.confidence}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{corr.confidence}% confidence</div>
          </div>
        ))}
      </div>
    </div>
  );
};
