export enum Clients {
  meribachat = 'meribachat',
  benefitwise = 'benefitwise'
}

export interface Session {
  id: string;
  client: Clients;
  userId?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SessionMessage {
  id?: number;
  sessionId: string;
  sender: 'user' | 'assistant';
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSessionPayload {
  client: Clients;
  userId?: string;
  token?: string;
}

export interface ApiResponse<T = any> {
  status: {
    error: boolean;
    code: number;
  };
  message: string;
  result?: T;
  count?: number;
}
