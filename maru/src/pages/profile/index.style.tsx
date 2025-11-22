import styled from '@emotion/styled';

/* 전체 페이지 */
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff1f8 0%, #fdeaff 50%, #fff3e8 100%);
  padding: 32px 24px;
`;

/* 상단 프로필 영역 */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

/* 헤더 버튼 */
export const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const SmallButton = styled.button`
  padding: 8px 14px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f5ff;
    border-color: #6366f1;
  }
`;

/* 중심 영역 */
export const CenterBox = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const MainIcon = styled.div`
  font-size: 52px;
  margin-bottom: 12px;
`;

export const MainTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const MainDesc = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
`;

/* 기능 카드 리스트 */
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 14px;
  padding: 20px 22px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
`;

export const CardIcon = styled.div`
  font-size: 26px;
  margin-bottom: 8px;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
`;

export const CardDesc = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;
