import styled from '@emotion/styled';

/* 전체 배경 */
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5ed 0%, #fcf1f8 50%, #faf5ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
`;

/* 메인 컨테이너 */
export const Container = styled.div`
  background: white;
  border-radius: 14px;
  padding: 32px;
  width: 100%;
  max-width: 768px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 32px;
  }
`;

/* 헤더 */
export const Header = styled.div`
  text-align: center;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  flex: 1;
  text-align: center;
`;

export const CodeButton = styled.button`
  padding: 8px 16px;
  background: #ff6b9d;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background: #ff5a8a;
    transform: translateY(-50%) scale(1.05);
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

/* 폼 전체 */
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
`;

/* 인풋 */
export const Input = styled.input`
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  &::placeholder {
    color: #999;
  }
`;

/* 역할(아빠/엄마 등) */
export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RoleBtn = styled.button<{ active?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${({ active }) => (active ? '#6366f1' : '#e5e5e5')};
  border-radius: 10px;
  background: ${({ active }) => (active ? '#6366f1' : 'white')};
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? 'white' : '#1a1a1a')};
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    border-color: #6366f1;
    background: ${({ active }) => (active ? '#6366f1' : '#f5f5ff')};
  }
`;

/* 아바타 버튼 */
export const AvatarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const AvatarBtn = styled.button<{ active?: boolean }>`
  width: 56px;
  height: 56px;
  border: 2px solid ${({ active }) => (active ? '#6366f1' : '#e5e5e5')};
  border-radius: 50%;
  background: ${({ active }) => (active ? '#f5f5ff' : 'white')};
  font-size: 28px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #6366f1;
    transform: scale(1.1);
  }
`;

/* 구성원 추가 버튼 */
export const AddBtn = styled.button`
  padding: 16px;
  border: 1px solid #6366f1;
  border-radius: 10px;
  background: white;
  color: #6366f1;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: #6366f1;
    color: white;
  }
`;

/* 추가된 구성원 리스트 */
export const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
`;

export const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

export const MemberCard = styled.div`
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const MemberAvatar = styled.span`
  font-size: 40px;
`;

export const MemberName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`;

export const MemberRole = styled.span`
  font-size: 12px;
  color: #666;
`;

/* 다음 버튼 */
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`;

export const NextBtn = styled.button<{ disabled?: boolean }>`
  padding: 14px 32px;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#6366f1')};
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#4f46e5')};
  }
`;

export const ArrowIcon = styled.span`
  font-size: 16px;
`;

/* 가족 코드 입력 모달 */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
`;

export const ModalInput = styled.input`
  padding: 14px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: border-color 0.2s;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  &::placeholder {
    color: #999;
    text-transform: none;
    letter-spacing: normal;
  }
`;

export const ModalHint = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e5e5;
`;

export const ModalCancelButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: white;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }
`;

export const ModalSubmitButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #ff6b9d, #c084fc);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;
