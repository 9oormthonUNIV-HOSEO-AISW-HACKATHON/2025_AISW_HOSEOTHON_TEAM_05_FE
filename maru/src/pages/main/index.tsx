import React, { useState } from 'react';
import * as S from './index.styles.tsx';


const MainPage = () => {
  const [familyCode, setFamilyCode] = useState("ABC123"); // 기본값

  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: `우리 가족 그룹에 참여해주세요!\n가족 코드: ${familyCode}`,
      link: {
        mobileWebUrl: "https://your-domain.com",
        webUrl: "https://your-domain.com",
      },
    });
  };

  return (
    <S.Container>
      <S.Title>FamTalk 메인</S.Title>
      <S.Desc>가족 코드를 입력하거나 수정해보세요!</S.Desc>

      {/* 가족코드 입력창 */}
      <S.Input
        value={familyCode}
        onChange={(e) => setFamilyCode(e.target.value)}
        placeholder="가족 코드를 입력하세요"
      />

      {/* 출력 박스 */}
      <S.CodeBox>
        가족 코드: <br /> <b>{familyCode}</b>
      </S.CodeBox>

      {/* 공유 버튼 */}
      <S.ShareButton onClick={handleKakaoShare}>
        카카오톡으로 공유하기
      </S.ShareButton>
    </S.Container>
  );
};

export default MainPage;
