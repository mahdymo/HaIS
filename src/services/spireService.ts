
import { apiClient } from './apiClient';
import { SpireComponent, ServiceResponse } from './types';

export class SpireService {
  async getComponents(): Promise<ServiceResponse<SpireComponent[]>> {
    return apiClient.get<SpireComponent[]>('/spire/components');
  }

  async getServerStatus(): Promise<ServiceResponse<{ status: string; lastSync: string }>> {
    return apiClient.get<{ status: string; lastSync: string }>('/spire/status');
  }

  async registerAgent(agentId: string): Promise<ServiceResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }>('/spire/agents', { agentId });
  }
}

export const spireService = new SpireService();
