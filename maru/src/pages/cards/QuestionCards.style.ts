import styled from '@emotion/styled';

/* 전체 배경 */
export const PageWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #ffeef3 0%, #fff3fb 40%, #fff7ff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 24px;
`;

/* 메인 컨테이너 */
export const Container = styled.div`
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 24px 28px;
    width: 100%;
    max-width: 768px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
    }
`;

/* 상단 헤더 */
export const HeaderBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: transparent;
    font-size: 14px;
    color: #444;
    cursor: pointer;

    &:hover {
    opacity: 0.8;
    }
`;

export const BackArrow = styled.span`
    font-size: 18px;
`;

export const RecordButton = styled.button`
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background: white;
    font-size: 12px;
    color: #444;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.08);
    cursor: pointer;

    &:hover {
    background: #fff4fb;
    }
`;

/* 인트로 영역 */
export const IntroSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
`;

export const IntroIconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 20%, #ffe4ff 0%, #ff6ac4 40%, #b96bff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: white;
`;

export const IntroTitle = styled.h1`
    font-size: 20px;
    font-weight: 600;
    margin: 0;
`;

export const IntroSubtitle = styled.p`
    font-size: 13px;
    color: #777;
    margin: 0;
`;

/* 질문 카드 */
export const CardSection = styled.section<{ $isCommon?: boolean }>`
    background: ${({ $isCommon }) => ($isCommon ? '#fff0f8' : '#fff7ff')};
    border-radius: 20px;
    border: ${({ $isCommon }) => 
        $isCommon ? '2px solid #ff6ac4' : '1px solid #f6dfff'};
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    box-shadow: ${({ $isCommon }) => 
        $isCommon ? '0 8px 24px rgba(255, 106, 196, 0.2)' : 'none'};
    position: relative;
    
    ${({ $isCommon }) => $isCommon && `
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 20px;
            background: linear-gradient(135deg, #ff6ac4, #b96bff);
            z-index: -1;
            opacity: 0.3;
        }
    `}
`;

export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
`;

export const CategoryIcon = styled.div`
    font-size: 36px;
`;

export const QuestionMeta = styled.div`
    font-size: 12px;
    color: #b35cff;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CommonBadge = styled.span`
    background: linear-gradient(135deg, #ff6ac4, #b96bff);
    color: white;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(255, 106, 196, 0.3);
`;

export const QuestionIndex = styled.span``;

export const QuestionText = styled.p<{ $isCommon?: boolean }>`
    font-size: ${({ $isCommon }) => ($isCommon ? '16px' : '14px')};
    text-align: center;
    color: ${({ $isCommon }) => ($isCommon ? '#8b1a5c' : '#333')};
    margin: 12px 0 0 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ $isCommon }) => ($isCommon ? '600' : '400')};
    line-height: 1.6;
`;

export const ShuffleButton = styled.button`
    align-self: center;
    margin-top: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #e3e3e3;
    background: white;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;

    &:hover {
    background: #fafafa;
    }
`;

/* 네비게이션 버튼 */
export const NavWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
    padding: 10px 24px;
    border-radius: 999px;
    border: ${({ disabled }) => (disabled ? 'none' : '1px solid #e5e5e5')};
    background: ${({ disabled }) => (disabled ? '#ddd' : 'white')};
    color: ${({ disabled }) => (disabled ? '#888' : '#333')};
    font-size: 13px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    min-width: 80px;

    &:hover {
    background: ${({ disabled }) => (disabled ? '#ddd' : '#fafafa')};
    }
`;

export const NavButtonPrimary = styled(NavButton)`
    background: ${({ disabled }) => (disabled ? '#ddd' : '#ff5fb6')};
    color: white;
    border: none;

    &:hover {
    background: ${({ disabled }) => (disabled ? '#ddd' : '#ff3f9f')};
    }
`;

/* 푸터 메시지 */
export const FooterMessageWrapper = styled.div`
    margin-top: 4px;
    padding: 12px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    text-align: center;
    color: #c07abf;
    line-height: 1.5;
`;