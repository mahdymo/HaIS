
import { apiClient } from './apiClient';
import { JA4Fingerprint, ServiceResponse } from './types';

export class JA4Service {
  async getFingerprints(): Promise<ServiceResponse<JA4Fingerprint[]>> {
    return apiClient.get<JA4Fingerprint[]>('/ja4/fingerprints');
  }

  async getMetrics(): Promise<ServiceResponse<{ packets: number; fingerprints: number }>> {
    return apiClient.get<{ packets: number; fingerprints: number }>('/ja4/metrics');
  }

  async analyzeFingerprint(fingerprint: string): Promise<ServiceResponse<{ risk: string }>> {
    return apiClient.post<{ risk: string }>('/ja4/analyze', { fingerprint });
  }
}

export const ja4Service = new JA4Service();
