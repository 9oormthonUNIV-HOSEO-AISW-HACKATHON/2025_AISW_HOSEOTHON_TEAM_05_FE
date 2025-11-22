import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./index.styles.tsx";
import { useCreateFamilyCode, useVerifyFamilyCode } from "../../apis/hooks.ts";

const MainPage = () => {
  const navigate = useNavigate();
  const [familyCode, setFamilyCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  // API 훅
  const createFamilyCodeMutation = useCreateFamilyCode();
  const { data: verifyData, isLoading: isVerifying } = useVerifyFamilyCode(
    codeInput.length === 8 ? codeInput : null
  );

  // 새 코드 생성 (서버 API 호출)
  const handleGenerateCode = () => {
    if (createFamilyCodeMutation.isPending) return;
    
    createFamilyCodeMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data.success && data.code) {
          setFamilyCode(data.code);
          setCodeInput(data.code);
        }
      },
      onError: (error) => {
        console.error("가족 코드 생성 실패:", error);
        alert("가족 코드 생성에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  // 코드 입력 시 검증
  useEffect(() => {
    if (codeInput.length === 8 && verifyData) {
      if (verifyData.success) {
        setFamilyCode(codeInput);
      } else {
        // 유효하지 않은 코드인 경우 (사용자가 직접 입력한 경우)
        // 에러 메시지는 표시하지 않고 그냥 무시
      }
    }
  }, [codeInput, verifyData]);

  // 코드 복사
  const handleCopy = () => {
    if (!familyCode) {
      alert("먼저 가족 코드를 생성하거나 입력해주세요.");
      return;
    }
    navigator.clipboard.writeText(familyCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  // 카카오톡 공유
const handleKakaoShare = () => {
  if (!window.Kakao) return;

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "가족 코드 공유",
      description: `가족 코드: ${familyCode}`,
      imageUrl: "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_pc_kakao.png",
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
  });
};


  return (
    <S.Container>
      {/* 상단 아이콘 */}
      <S.IconWrapper>
        <S.IconCircle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.42" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </S.IconCircle>
      </S.IconWrapper>

      <S.Title>가족 코드 공유</S.Title>
      <S.Desc>
        가족 구성원들과 이 코드를 공유하여 <br />
        함께 가족 연결을 시작하세요
      </S.Desc>

      {/* 메인 카드 UI */}
      <S.Card>
        <S.CodeLabel>가족 코드
              <S.ActionButton
      disabled={createFamilyCodeMutation.isPending}
      onClick={handleGenerateCode}
      className={createFamilyCodeMutation.isPending ? "disabled" : ""}
    >
      <svg width="16" height="16" fill="none" stroke="currentColor">
        <path d="M8 2v6m0 6a6 6 0 100-12 6 6 0 000 12z" />
      </svg>
      {createFamilyCodeMutation.isPending ? "생성 중..." : "새로 생성"}
    </S.ActionButton>
        </S.CodeLabel>

        {/* Input + 버튼들 */}
        <S.CodeInputRow>
  <S.Input
    value={codeInput}
    maxLength={8}
    onChange={(e) => {
      const upperCode = e.target.value.toUpperCase();
      setCodeInput(upperCode);
      if (upperCode.length === 8) {
        setFamilyCode(upperCode);
      }
    }}
    placeholder="가족 코드 입력"
    disabled={createFamilyCodeMutation.isPending}
  />

  <S.ButtonGroup>


    <S.ActionButton
      onClick={handleCopy}
      className={copied ? "copied" : ""}
    >
      <svg width="16" height="16" fill="none" stroke="currentColor">
        <rect x="5" y="5" width="8" height="8" rx="1" />
        <path d="M5 5c0-1.1.9-2 2-2h2" />
      </svg>
      {copied ? "복사됨" : "복사"}
    </S.ActionButton>
  </S.ButtonGroup>
</S.CodeInputRow>


        <S.Hint>
          {familyCode 
            ? `✅ 가족 코드: ${familyCode} (${verifyData?.memberCount || 0}명 참여 중)`
            : "원하는 코드를 직접 입력하거나 '새로 생성' 버튼으로 자동 생성할 수 있습니다"}
        </S.Hint>

        {/* 카카오 공유 */}
        <S.KakaoButton onClick={handleKakaoShare}>
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path d="M12 3C6.5 3 2 6.5 2 11c0 2.8 1.9 5.3 4.8 6.7L5 21l4.1-2.5c.9.2 1.9.3 2.9.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
          </svg>
          카카오톡으로 공유하기
        </S.KakaoButton>

        <S.InfoBox>
          💡 가족 구성원들이 이 코드로 함께 참여할 수 있습니다
        </S.InfoBox>
      </S.Card>

      {/* 다음 버튼 */}
<S.NextButton onClick={() => {
  // localStorage에서 가족 구성원 데이터 가져오기
  try {
    const storedMembers = localStorage.getItem('familyMembers');
    const members = storedMembers ? JSON.parse(storedMembers) : [];
    navigate("/profile", { state: { members } });
  } catch (e) {
    console.error('Failed to get members from localStorage', e);
    navigate("/profile", { state: { members: [] } });
  }
}}>
  다음으로 진행 →
</S.NextButton>



      <S.BottomText>
        나중에 홈 화면에서도 가족 코드를 확인하고 공유할 수 있습니다
      </S.BottomText>
    </S.Container>
  );
};

export default MainPage;
