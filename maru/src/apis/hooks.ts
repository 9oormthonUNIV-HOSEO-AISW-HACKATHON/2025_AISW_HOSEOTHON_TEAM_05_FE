import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  api, 
  ResultRequest, 
  JoinFamilyRequest,
  VerifyFamilyCodeResponse 
} from './api.ts';

// React Query 훅들

// GET /ping 훅
export const usePing = () => {
  return useQuery({
    queryKey: ['ping'],
    queryFn: () => api.ping(),
    staleTime: 5000, // 5초간 캐시 유지
  });
};

// POST /result 훅
export const usePostResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ResultRequest) => api.postResult(data),
    onSuccess: () => {
      // 성공 시 필요한 작업 (예: 캐시 무효화)
      // queryClient.invalidateQueries({ queryKey: ['result'] });
    },
  });
};

// POST /api/family/code - 가족 코드 생성 훅
export const useCreateFamilyCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => api.createFamilyCode(),
    onSuccess: (data) => {
      // 가족 코드 생성 성공 시 해당 코드로 쿼리 캐시 무효화
      if (data.code) {
        queryClient.invalidateQueries({ queryKey: ['family', data.code] });
      }
    },
  });
};

// GET /api/family/code/:code - 가족 코드 검증 훅
export const useVerifyFamilyCode = (code: string | null) => {
  return useQuery({
    queryKey: ['family', 'code', code],
    queryFn: () => api.verifyFamilyCode(code!),
    enabled: !!code && code.length === 8, // 코드가 8자리일 때만 실행
    retry: false, // 404 에러는 재시도하지 않음
  });
};

// POST /api/family/join - 가족 참여 훅
export const useJoinFamily = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: JoinFamilyRequest) => api.joinFamily(data),
    onSuccess: (data) => {
      // 가족 참여 성공 시 구성원 목록 캐시 무효화
      if (data.family?.code) {
        queryClient.invalidateQueries({ queryKey: ['family', data.family.code, 'members'] });
      }
    },
  });
};

// GET /api/family/:code/members - 가족 구성원 목록 조회 훅
export const useGetFamilyMembers = (code: string | null) => {
  return useQuery({
    queryKey: ['family', code, 'members'],
    queryFn: () => api.getFamilyMembers(code!),
    enabled: !!code && code.length === 8, // 코드가 8자리일 때만 실행
  });
};

