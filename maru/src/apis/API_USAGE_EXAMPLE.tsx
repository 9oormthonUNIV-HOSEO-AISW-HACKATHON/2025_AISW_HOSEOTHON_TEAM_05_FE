/**
 * API 사용 예시 컴포넌트
 * 
 * 이 파일은 프론트엔드에서 백엔드 API를 사용하는 방법을 보여주는 예시입니다.
 * 실제 컴포넌트에서 이렇게 사용하시면 됩니다.
 */

import React, { useState } from 'react';
import { usePing, usePostResult } from './hooks';

const APIUsageExample = () => {
  const [answer, setAnswer] = useState('');
  
  // GET /ping 훅 사용
  const { data: pingData, isLoading: pingLoading, error: pingError } = usePing();
  
  // POST /result 훅 사용
  const { mutate: postResult, isPending: isPosting } = usePostResult();

  const handleSubmit = () => {
    if (!answer.trim()) return;
    
    postResult(
      { answer },
      {
        onSuccess: (data) => {
          console.log('성공:', data);
          alert(`서버 응답: ${data.result}`);
          setAnswer('');
        },
        onError: (error) => {
          console.error('에러:', error);
          alert('요청 실패: ' + (error as Error).message);
        },
      }
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>API 연동 예시</h2>
      
      {/* GET /ping 테스트 */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>GET /ping 테스트</h3>
        {pingLoading && <p>로딩 중...</p>}
        {pingError && <p style={{ color: 'red' }}>에러: {String(pingError)}</p>}
        {pingData && (
          <p style={{ color: 'green' }}>
            ✅ 서버 응답: {pingData.message}
          </p>
        )}
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>

      {/* POST /result 테스트 */}
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>POST /result 테스트</h3>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button 
          onClick={handleSubmit} 
          disabled={isPosting || !answer.trim()}
          style={{ padding: '8px 16px' }}
        >
          {isPosting ? '전송 중...' : '전송'}
        </button>
      </div>
    </div>
  );
};

export default APIUsageExample;

