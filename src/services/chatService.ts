import { apiClient } from '~/config/api';
import { ApiResponse, CreateSessionPayload, Session, SessionMessage } from '~/types/chat';

export const chatService = {
  async createSession(payload: CreateSessionPayload): Promise<ApiResponse<string>> {
    const res = await apiClient.post<ApiResponse<string>>('/sessions/new', payload);
    return res.data;
  },

  async sendMessage(sessionId: string, text: string): Promise<ApiResponse<string>> {
    const res = await apiClient.post<ApiResponse<string>>(`/sessions/${sessionId}/message`, { text });
    return res.data;
  },

  async getSessions(): Promise<ApiResponse<Session[]>> {
    try {
      const res = await apiClient.get<ApiResponse<Session[]>>('/sessions', {
        params: {
          field: 'createdAt',
          order: 'DESC',
          count: 50
        }
      });
      return res.data;
    } catch (err) {
      console.warn('Could not fetch sessions from server:', err);
      return { status: { error: true, code: 500 }, message: 'Failed to fetch sessions', result: [] };
    }
  },

  async getSessionMessages(sessionId: string): Promise<ApiResponse<SessionMessage[]>> {
    try {
      const res = await apiClient.get<ApiResponse<SessionMessage[]>>('/session-message', {
        params: {
          where: JSON.stringify({ sessionId }),
          field: 'createdAt',
          order: 'ASC',
          count: 100
        }
      });
      return res.data;
    } catch (err) {
      console.warn('Could not fetch session messages from server:', err);
      return { status: { error: true, code: 500 }, message: 'Failed to fetch messages', result: [] };
    }
  }
};
