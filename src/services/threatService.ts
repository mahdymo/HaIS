
import { apiClient } from './apiClient';
import { ThreatLocation, ServiceResponse } from './types';

export class ThreatService {
  async getThreatLocations(): Promise<ServiceResponse<ThreatLocation[]>> {
    return apiClient.get<ThreatLocation[]>('/threats/locations');
  }

  async getTotalThreats(): Promise<ServiceResponse<{ total: number }>> {
    return apiClient.get<{ total: number }>('/threats/total');
  }

  async analyzeGeoThreat(location: string): Promise<ServiceResponse<{ threat_level: string }>> {
    return apiClient.post<{ threat_level: string }>('/threats/analyze', { location });
  }
}

export const threatService = new ThreatService();
