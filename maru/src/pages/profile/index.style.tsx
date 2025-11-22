// src/pages/profile/family_connect_styles.tsx
import styled from "@emotion/styled";

/* ============================= */
/*          기본 페이지 스타일         */
/* ============================= */

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff1f8 0%, #fdeaff 50%, #fff3e8 100%);
  padding: 32px 24px;
`;

/* HEADER */
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
  transition: 0.2s;

  &:hover {
    background: #f5f5ff;
    border-color: #6366f1;
  }
`;

/* CENTER */
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

/* CARD LIST */
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
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
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

/* ============================= */
/*          POPUP BASE STYLE         */
/* ============================= */

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const PopupBox = styled.div`
  width: 600px;
  max-width: 90%;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 28px;
  color: #8b739e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.15s ease-out;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const PopupTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  padding-right: 40px;
`;

export const PopupGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const PopupCard = styled.div<{ selected: boolean }>`
  width: 150px;
  padding: 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ffb4e6 0%, #bb85ff 100%);
  text-align: center;
  color: white;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  transform: ${({ selected }) => (selected ? "scale(1.06)" : "scale(1)")};

  &:hover {
    transform: scale(1.06);
  }
`;

export const Checkbox = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 10px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ selected }) => (selected ? "#ffffff" : "rgba(255, 255, 255, 0.5)")};
  border-radius: 4px;
  background: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bb85ff;
  font-size: 16px;
  font-weight: 700;
`;

export const PopupAvatar = styled.div`
  font-size: 45px;
  margin-bottom: 10px;
`;

export const PopupName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const PopupRole = styled.div`
  font-size: 13px;
  opacity: 0.9;
  margin-top: 4px;
`;

export const SelectCheck = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 20px;
`;

export const PopupClose = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #f3f3ff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #e0e1ff;
  }
`;

/* ============================= */
/*         FAMILY CODE SECTION        */
/* ============================= */

export const FamilyCodeSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
  text-align: center;
`;

export const FamilyCodeLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const FamilyCodeValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #bb85ff;
  letter-spacing: 2px;
  font-family: monospace;
`;

/* ============================= */
/*         PROFILE EDIT POPUP        */
/* ============================= */

export const EditPopup = styled.div`
  width: 600px;
  max-width: 90%;
  background: white;
  padding: 30px 28px;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  position: relative;
`;

export const EditAvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const EditAvatar = styled.div`
  font-size: 68px;
  width: 95px;
  height: 95px;
  border-radius: 18px;
  background: linear-gradient(135deg, #ffb4e6 0%, #bb85ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarHint = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

export const EditLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 14px 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 18px;
  font-size: 15px;
  box-sizing: border-box;
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 26px;
`;

export const RoleButton = styled.button<{ active: boolean }>`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ active }) => (active ? "#bb85ff" : "#ddd")};
  background: ${({ active }) => (active ? "#f5e7ff" : "white")};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #bb85ff;
  }
`;

export const EditButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const DeleteButton = styled.button`
  flex: 1;
  padding: 14px;
  background: #ffe2e2;
  border: none;
  color: #d9534f;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #ffd0d0;
  }
`;

export const SaveButton = styled.button`
  flex: 1;
  padding: 14px;
  background: linear-gradient(90deg, #ff6b9d, #c084fc);
  border: none;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

/* ============================= */
/*         AVATAR SELECT POPUP       */
/* ============================= */

export const AvatarPopup = styled.div`
  width: 500px;
  max-width: 90%;
  background: white;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.17);
  position: relative;
`;

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
`;

export const AvatarItem = styled.div<{ selected?: boolean }>`
  font-size: 42px;
  background: ${({ selected }) => (selected ? "linear-gradient(135deg, #ffb4e6 0%, #bb85ff 100%)" : "#faf7ff")};
  padding: 18px 0;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  transition: 0.15s;
  border: ${({ selected }) => (selected ? "2px solid #bb85ff" : "2px solid transparent")};

  &:hover {
    background: ${({ selected }) => (selected ? "linear-gradient(135deg, #ffb4e6 0%, #bb85ff 100%)" : "#ebdfff")};
  }
`;
