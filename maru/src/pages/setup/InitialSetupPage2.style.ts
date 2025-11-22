// src/pages/setup/InitialSetupPage2.styles.ts
import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5ed 0%, #fcf1f8 50%, #faf5ff 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 24px;
`;

export const Container = styled.div`
  background: white;
  border-radius: 14px;
  padding: 32px;
  width: 100%;
  max-width: 768px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackBtn = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #6366f1;
    background: #f5f5ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const ProgressText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #666;
`;

export const ProfileBox = styled.div`
  background: #fff5f7;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  font-size: 42px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const RoleTag = styled.span`
  display: inline-block;
  font-size: 14px;
  padding: 6px 14px;
  background: #ffedf1;
  color: #ff4f7b;
  border-radius: 12px;
  font-weight: 500;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryTitle = styled.h3`
  font-size: 18px;
  color: #1a1a1a;
  margin: 0;
`;

export const SelectedCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
  background: #f5f5ff;
  color: #6366f1;
`;

export const TasteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

export const TasteBtn = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid ${({ selected }) => (selected ? "#6366f1" : "#e5e5e5")};
  border-radius: 10px;
  background: ${({ selected }) => (selected ? "#6366f1" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#1a1a1a")};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #6366f1;
    background: ${({ selected }) => (selected ? "#6366f1" : "#f5f5ff")};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

export const NextBtn = styled.button<{ disabled?: boolean }>`
  width: 70%;
  padding: 14px 32px;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "linear-gradient(90deg,#ff80b5,#a18aff)")};
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: 0.2s;
`;
