
import React from 'react';
import { JA4Collector } from './JA4Collector';
import { SpireStatus } from './SpireStatus';
import { CorrelationEngine } from './CorrelationEngine';
import { IdentityManager } from './IdentityManager';
import { ThreatMap } from './ThreatMap';
import { PolicyManager } from './PolicyManager';

export const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <JA4Collector />
      </div>
      <div>
        <SpireStatus />
      </div>
      <div>
        <CorrelationEngine />
      </div>
      <div>
        <IdentityManager />
      </div>
      <div>
        <ThreatMap />
      </div>
      <div className="lg:col-span-2">
        <PolicyManager />
      </div>
    </div>
  );
};
