import apiClient from './apiClient.ts';

// API 응답 타입 정의
export interface PingResponse {
  message: string;
}

export interface ResultRequest {
  answer: string;
}

export interface ResultResponse {
  result: string;
}

// 가족 코드 관련 타입
export interface CreateFamilyCodeResponse {
  success: boolean;
  code: string;
  message: string;
}

export interface VerifyFamilyCodeResponse {
  success: boolean;
  code: string;
  createdAt: string;
  memberCount: number;
  message: string;
  error?: string;
}

export interface JoinFamilyRequest {
  code: string;
  member: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export interface JoinFamilyResponse {
  success: boolean;
  message: string;
  member: {
    id: number;
    name: string;
    role: string;
    avatar: string;
    joinedAt: string;
  };
  family: {
    code: string;
    memberCount: number;
  };
  error?: string;
}

export interface FamilyMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  joinedAt: string;
}

export interface GetFamilyMembersResponse {
  success: boolean;
  members: FamilyMember[];
  memberCount: number;
  error?: string;
}

// API 함수들
export const api = {
  // GET /ping - 서버 연결 테스트
  ping: async (): Promise<PingResponse> => {
    const response = await apiClient.get<PingResponse>('/ping');
    return response.data;
  },

  // POST /result - 답변 전송
  postResult: async (data: ResultRequest): Promise<ResultResponse> => {
    const response = await apiClient.post<ResultResponse>('/result', data);
    return response.data;
  },

  // POST /api/family/code - 가족 코드 생성
  createFamilyCode: async (): Promise<CreateFamilyCodeResponse> => {
    const response = await apiClient.post<CreateFamilyCodeResponse>('/api/family/code');
    return response.data;
  },

  // GET /api/family/code/:code - 가족 코드 검증
  verifyFamilyCode: async (code: string): Promise<VerifyFamilyCodeResponse> => {
    const response = await apiClient.get<VerifyFamilyCodeResponse>(`/api/family/code/${code}`);
    return response.data;
  },

  // POST /api/family/join - 가족 코드로 가족 참여
  joinFamily: async (data: JoinFamilyRequest): Promise<JoinFamilyResponse> => {
    const response = await apiClient.post<JoinFamilyResponse>('/api/family/join', data);
    return response.data;
  },

  // GET /api/family/:code/members - 가족 구성원 목록 조회
  getFamilyMembers: async (code: string): Promise<GetFamilyMembersResponse> => {
    const response = await apiClient.get<GetFamilyMembersResponse>(`/api/family/${code}/members`);
    return response.data;
  },
};

