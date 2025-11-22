import styled from "@emotion/styled";

/* 전체 컨테이너 */
export const Container = styled.div`
  width: 100%;
  padding: 24px;
  min-height: 100vh;
  background: #fff5f8;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 아이콘 영역 */
export const IconWrapper = styled.div`
  margin-top: 40px;
`;

export const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff6b9d, #c084fc);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 4px 12px rgba(192, 132, 252, 0.3);
`;

/* 타이틀 */
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 18px;
  color: #ff6b9d;
`;

export const Desc = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-top: 8px;
`;

/* 카드 전체 */
export const Card = styled.div`
  background: #fff;
  width: 100%;
  max-width: 420px;

  margin-top: 30px;
  padding: 24px;

  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* 라벨 */
export const CodeLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 입력창 + 버튼 그룹 */
export const CodeInputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start; 
`;

/* Input */
export const Input = styled.input`
  flex: 1;
  padding: 13px 16px;
  background: #faf5ff;
  border: 1.5px solid #e5e5e5;
  border-radius: 10px;

  font-size: 18px;
  font-family: "Courier New", monospace;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:focus {
    outline: none;
    border-color: #c084fc;
    background: #fff;
  }
`;

/* action button */
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 10px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #555;

  cursor: pointer;
  transition: 0.2s ease;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.copied {
    background: #69c57a;
    color: white;
    border: none;
  }

  &:hover:not(.disabled):not(.copied) {
    border-color: #c084fc;
    color: #c084fc;
    background: #faf5ff;
  }
`;

export const Hint = styled.p`
  font-size: 12px;
  color: #777;
  line-height: 1.4;
`;

/* 카카오톡 버튼 */
export const KakaoButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #fee500;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 700;
  color: black;

  cursor: pointer;
  transition: 0.2s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #fdd835;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(253, 216, 53, 0.4);
  }
`;

export const InfoBox = styled.div`
  width: 100%;
  padding: 12px;

  background: #f9f9f9;
  border-radius: 8px;

  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

/* 다음 버튼 */
export const NextButton = styled.button`
  margin-top: 34px;
  width: 100%;
  max-width: 350px;

  padding: 14px;
  border-radius: 12px;

  background: linear-gradient(135deg, #ff6b9d, #c084fc);
  color: #fff;
  font-size: 17px;
  font-weight: 600;

  cursor: pointer;
  box-shadow: 0 2px 8px rgba(192, 132, 252, 0.3);

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(192, 132, 252, 0.4);
  }
`;

export const BottomText = styled.p`
  margin-top: 14px;
  font-size: 12px;
  color: #999;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
