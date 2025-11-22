import styled from "@emotion/styled";

/* 전체 페이지 레이아웃 */
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fcf1f8 0%, #faf5ff 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
`;

/* ---------------------- 헤더 ---------------------- */
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
`;

export const BackButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;

  background: none;
  border: none;
  cursor: pointer;

  color: #1a1a1a;
  font-size: 15px;
  font-weight: 500;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    opacity: 0.7;
  }
`;

export const ProgressText = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 4px;

  .current {
    color: #6366f1;
    font-weight: 600;
  }
  .separator {
    color: #999;
  }
  .total {
    color: #666;
  }
`;

/* ---------------------- 프로필 카드 ---------------------- */

export const ProfileCard = styled.div`
  background: white;
  border: 2px solid #e9d5ff;
  border-radius: 14px;
  margin: 20px;
  padding: 24px;

  display: flex;
  align-items: center;
  gap: 16px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  background: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 48px;
  }

  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MemberName = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #c084fc;
`;

export const RoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;

  background: #fce7f3;
  color: #ec4899;

  font-size: 13px;
  font-weight: 500;
  width: fit-content;
`;

/* ---------------------- 활동 카드 ---------------------- */

export const ActivitiesCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 24px;
  margin: 0 20px 20px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ActivitiesTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 20px 0;
  color: #1a1a1a;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const ActivityItem = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  
  padding: 20px 16px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 6px;

  transition: all 0.2s;

  &:hover {
    border-color: #c084fc;
    background: #faf5ff;
  }

  .icon {
    font-size: 30px;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
  }
`;

/* ---------------------- 다음 버튼 ---------------------- */

export const NextButton = styled.button`
  width: calc(100% - 40px);
  margin: 0 20px 20px;

  padding: 16px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(90deg, #ff6b9d 0%, #c084fc 100%);
  color: white;

  font-size: 16px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(192, 132, 252, 0.4);
  }
`;

/* ---------------------- 팝업 ---------------------- */

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  z-index: 1000;
`;

export const Popup = styled.div`
  background: white;
  width: 100%;
  max-width: 400px;

  border-radius: 14px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export const PopupHeader = styled.div`
  padding: 24px;

  display: flex;
  align-items: center;
  gap: 16px;

  border-bottom: 1px solid #f0f0f0;
`;

export const PopupAvatarCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;

  background: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 40px;
  }
`;

export const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const PopupRoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;

  background: #fce7f3;
  color: #ec4899;

  font-size: 13px;
  font-weight: 500;
`;

export const PopupContent = styled.div`
  padding: 24px;

  .day-message {
    font-size: 18px;
    font-weight: 600;
  }

  .day-number {
    color: #ef4444;
    font-weight: 700;
  }

  .day-desc {
    margin-top: 10px;
    font-size: 14px;
    color: #666;

    .highlight {
      color: #c084fc;
      font-weight: 600;
    }
  }
`;

export const PopupFooter = styled.div`
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
`;

export const ConfirmButton = styled.button`
  padding: 12px 24px;

  background: linear-gradient(90deg, #ff6b9d 0%, #c084fc 100%);
  border-radius: 10px;
  border: none;

  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(192, 132, 252, 0.4);
  }
`;
