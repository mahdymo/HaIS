
import { apiClient } from './apiClient';
import { Policy, ServiceResponse } from './types';

export class PolicyService {
  async getPolicies(): Promise<ServiceResponse<Policy[]>> {
    return apiClient.get<Policy[]>('/policy/list');
  }

  async updatePolicy(policyId: string, updates: Partial<Policy>): Promise<ServiceResponse<Policy>> {
    return apiClient.post<Policy>(`/policy/${policyId}/update`, updates);
  }

  async getMetrics(): Promise<ServiceResponse<{ active: number; protected: number; updating: number }>> {
    return apiClient.get<{ active: number; protected: number; updating: number }>('/policy/metrics');
  }
}

export const policyService = new PolicyService();
