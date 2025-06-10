
export interface JA4Fingerprint {
  id: string;
  ja4: string;
  source: string;
  risk: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface SpireComponent {
  name: string;
  status: 'online' | 'offline';
  count: number;
}

export interface Correlation {
  type: string;
  confidence: number;
  threat: 'Low' | 'Medium' | 'High';
}

export interface Identity {
  spiffeId: string;
  status: 'verified' | 'expired' | 'pending';
  lastSeen: string;
}

export interface Policy {
  name: string;
  status: 'active' | 'updating' | 'inactive';
  workloads: number;
  lastUpdated: string;
}

export interface Alert {
  id: number;
  type: 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ThreatLocation {
  location: string;
  count: number;
  severity: 'low' | 'medium' | 'high';
}

export interface ServiceResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}
