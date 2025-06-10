
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Eye, RefreshCw, Play, Pause } from 'lucide-react';
import { DataGenerator, GeneratedIdentity, GeneratedAnomaly } from '../utils/dataGenerator';

export const AnomalyDetectionDashboard = () => {
  const [identities, setIdentities] = useState<GeneratedIdentity[]>([]);
  const [anomalies, setAnomalies] = useState<GeneratedAnomaly[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);

  const generateData = () => {
    const normalIdentities = DataGenerator.generateNormalIdentities(15);
    const anomalousIdentities = DataGenerator.generateAnomalousIdentities(3);
    const systemAnomalies = DataGenerator.generateAnomalies(5);
    
    setIdentities([...normalIdentities, ...anomalousIdentities]);
    setAnomalies(systemAnomalies);
  };

  const runGeneration = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    generateData();
    setIsGenerating(false);
  };

  useEffect(() => {
    generateData(); // Initial data generation
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoGenerate) {
      interval = setInterval(() => {
        runGeneration();
      }, 10000); // Generate new data every 10 seconds
    }
    return () => clearInterval(interval);
  }, [autoGenerate]);

  const normalIdentities = identities.filter(id => id.status !== 'anomalous');
  const anomalousIdentities = identities.filter(id => id.status === 'anomalous');
  const criticalAnomalies = anomalies.filter(a => a.severity === 'high');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-900';
      case 'expired': return 'text-amber-400 bg-amber-900';
      case 'anomalous': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2" />
          Anomaly Detection Dashboard
        </h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAutoGenerate(!autoGenerate)}
            className={`flex items-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
              autoGenerate ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {autoGenerate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{autoGenerate ? 'Stop Auto' : 'Auto Gen'}</span>
          </button>
          
          <button
            onClick={runGeneration}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-3 py-2 rounded text-sm transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Shield className="h-5 w-5 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">{normalIdentities.length}</div>
          <div className="text-xs text-gray-400">Normal IDs</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">{anomalousIdentities.length}</div>
          <div className="text-xs text-gray-400">Anomalous IDs</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <Eye className="h-5 w-5 text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">{anomalies.length}</div>
          <div className="text-xs text-gray-400">Total Anomalies</div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-white font-mono">{criticalAnomalies.length}</div>
          <div className="text-xs text-gray-400">Critical</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detected Identities */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300">Recent Identity Activity</h3>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {identities.slice(0, 10).map((identity) => (
              <div key={identity.id} className="bg-gray-900 rounded p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(identity.status)}`}>
                    {identity.status.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono ${getRiskColor(identity.risk)}`}>
                      {identity.risk.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">{identity.lastSeen}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-cyan-300 break-all mb-1">
                  {identity.spiffeId}
                </div>
                <div className="text-xs text-gray-400">
                  {identity.ipAddress} • {identity.confidence}% confidence
                </div>
                {identity.anomalyType && (
                  <div className="text-xs text-red-400 mt-1">
                    Anomaly: {identity.anomalyType.replace('_', ' ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Anomalies */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300">System Anomalies</h3>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="bg-gray-900 rounded p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    anomaly.severity === 'high' ? 'bg-red-900 text-red-400' :
                    anomaly.severity === 'medium' ? 'bg-amber-900 text-amber-400' :
                    'bg-green-900 text-green-400'
                  }`}>
                    {anomaly.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">{anomaly.timestamp}</span>
                </div>
                <div className="text-sm text-gray-200 mb-1">
                  {anomaly.type.replace('_', ' ').toUpperCase()}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {anomaly.description}
                </div>
                <div className="text-xs font-mono text-cyan-300 mb-1">
                  {anomaly.affectedIdentity}
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {anomaly.indicators.map((indicator, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-1 rounded">
                      {indicator}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400">
                  {anomaly.confidence}% confidence
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
