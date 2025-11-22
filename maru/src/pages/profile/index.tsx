import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as S from './index.style.tsx';

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[];
}

const FamilyConnectPage: React.FC = () => {
  const location = useLocation();
  
  const navigate = useNavigate();

  // setup2 → navigate("/profile", { state: { members } });
  const { members } = location.state as { members: Member[] };

  // 기본 프로필 = 첫 번째 구성원
  const current = members[0];

  return (
    <S.PageWrapper>

      {/* 헤더 영역 */}
      <S.Header>
        <S.ProfileBox>
          <S.ProfileImage>{current.avatar}</S.ProfileImage>
          <S.ProfileName>{current.name}</S.ProfileName>
        </S.ProfileBox>

        <S.HeaderButtons>
          <S.SmallButton onClick={() => navigate("/switch-profile", { state: { members } })}>
            프로필 전환
          </S.SmallButton>

          <S.SmallButton onClick={() => navigate("/edit-profile", { state: { members } })}>
            프로필 변경
          </S.SmallButton>
        </S.HeaderButtons>
      </S.Header>

      {/* 중앙 안내 영역 */}
      <S.CenterBox>
        <S.MainIcon>💗</S.MainIcon>
        <S.MainTitle>가족 연결</S.MainTitle>
        <S.MainDesc>
          가족 구성원들의 취향을 이해하고<br />
          대화를 시작하며 추억을 공유하세요
        </S.MainDesc>
      </S.CenterBox>

      {/* 카드 리스트 */}
      <S.CardList>

        <S.Card onClick={() => navigate("/common-taste", { state: { members } })}>
          <S.CardIcon>💖</S.CardIcon>
          <S.CardTitle>공통 취향 발견</S.CardTitle>
          <S.CardDesc>
            가족 구성원들의 취향을 확인하고<br />
            공통 관심사 TOP 3를 확인해보세요
          </S.CardDesc>
        </S.Card>

        <S.Card onClick={() => navigate("/conversation", { state: { members } })}>
          <S.CardIcon>💬</S.CardIcon>
          <S.CardTitle>대화 시작 카드</S.CardTitle>
          <S.CardDesc>
            공통 취향을 기반으로<br />
            자연스럽게 대화를 시작할 질문을 추천받으세요
          </S.CardDesc>
        </S.Card>

        <S.Card onClick={() => navigate("/timeline", { state: { members } })}>
          <S.CardIcon>📸</S.CardIcon>
          <S.CardTitle>추억 타임라인</S.CardTitle>
          <S.CardDesc>
            함께한 순간을 기록하고<br />
            가족의 소중한 추억을 쌓아가세요
          </S.CardDesc>
        </S.Card>

      </S.CardList>
    </S.PageWrapper>
  );
};

export default FamilyConnectPage;
