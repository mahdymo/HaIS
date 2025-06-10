
import { apiClient } from './apiClient';
import { Identity, ServiceResponse } from './types';

export class IdentityService {
  async getIdentities(): Promise<ServiceResponse<Identity[]>> {
    return apiClient.get<Identity[]>('/identity/list');
  }

  async verifyIdentity(spiffeId: string): Promise<ServiceResponse<{ verified: boolean }>> {
    return apiClient.post<{ verified: boolean }>('/identity/verify', { spiffeId });
  }

  async getMetrics(): Promise<ServiceResponse<{ active: number; verified: number }>> {
    return apiClient.get<{ active: number; verified: number }>('/identity/metrics');
  }
}

export const identityService = new IdentityService();
