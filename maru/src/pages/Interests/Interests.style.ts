import styled from "styled-components";

/* ------------------- 공통 값 ------------------- */
const CARD_RADIUS = "24px";
const SHADOW = "0 18px 45px rgba(0, 0, 0, 0.06)";

/* ------------------- 레이아웃 래퍼 ------------------- */
export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 40px 16px 80px;
    box-sizing: border-box;
`;

export const ContentCard = styled.div`
    width: 100%;
    max-width: 880px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 32px;
    box-shadow: ${SHADOW};
    padding: 32px 32px 40px;
    box-sizing: border-box;

    @media (max-width: 768px) {
    padding: 24px 20px 32px;
    border-radius: 24px;
    }
`;

/* ------------------- 헤더 ------------------- */
export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: #4a3b52;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s ease-out, transform 0.1s ease-out;

    &:hover {
    background: rgba(0, 0, 0, 0.04);
    transform: translateX(-1px);
    }
`;

export const BackArrow = styled.span`
    font-size: 16px;
    line-height: 1;
`;

/* ------------------- 상단 섹션 ------------------- */
export const TopSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 16px 28px;
    border-radius: ${CARD_RADIUS};
    background: linear-gradient(160deg, #ffe0f2 0%, #ffeaf4 40%, #fff6ff 100%);
    margin-bottom: 24px;
`;

export const TopIcon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ff66c4, #ff7ad9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 28px;
    margin-bottom: 12px;
    box-shadow: 0 10px 24px rgba(255, 102, 196, 0.35);
`;

export const TopTitle = styled.h1`
    font-size: 22px;
    font-weight: 700;
    color: #3e2459;
    margin: 0 0 6px;
`;

export const TopSubtitle = styled.p`
    font-size: 14px;
    color: #7b618f;
    margin: 0 0 14px;
`;

export const CommonBlock = styled.div`
    margin-top: 12px;
    padding: 14px 18px;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(180, 114, 255, 0.18);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
`;

export const CommonTitle = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #b83bff;
    background: rgba(184, 59, 255, 0.08);
    padding: 4px 10px;
    border-radius: 999px;
`;

export const CommonTitleText = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #b83bff;
    margin-bottom: 8px;
    width: 100%;
    text-align: left;
`;

export const CommonIcon = styled.span`
    font-size: 32px;
    line-height: 1;
`;

export const CommonBadge = styled.span`
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    background: #b83bff;
    padding: 4px 8px;
    border-radius: 50%;
    min-width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CommonTag = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: #4c2a6d;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(120deg, #ffe3ff 0%, #ffeefb 100%);
`;

export const MemberTags = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-left: auto;
`;

export const MemberTag = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: #6b4c8a;
    padding: 4px 10px;
    border-radius: 999px;
    background: #f0e5ff;
`;

export const NoCommonBox = styled.div`
    margin-top: 10px;
    padding: 12px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    color: #6b557b;
    line-height: 1.5;

    p {
    margin: 0;
    }

    p + p {
    margin-top: 4px;
    }
`;

/* ------------------- 다음 단계 섹션 ------------------- */
export const NextStepSection = styled.section`
    margin: 10px 0 24px;
    border-radius: ${CARD_RADIUS};
    background: #ffffff;
    box-shadow: ${SHADOW};
    padding: 0;
    overflow: hidden;
`;

export const NextButtonBase = styled.button`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: 14px 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: filter 0.15s ease-out, transform 0.1s ease-out;

    span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.92);
    }

    &:active {
    transform: translateY(1px);
    filter: brightness(0.96);
    }
`;

export const NextButton = styled(NextButtonBase)`
    background: linear-gradient(90deg, #ff5bb8 0%, #ff7a7a 50%, #ffb067 100%);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
`;

export const NextButtonSecondary = styled(NextButtonBase)`
    background: #ffffff;
    color: #ff4f9a;

    span {
    color: #b28cc4;
    }
`;

/* ------------------- 구성원 카드 ------------------- */
export const MemberCardWrapper = styled.section`
    margin-top: 18px;
    padding: 16px 18px 14px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.03);

    & + & {
    margin-top: 12px;
    }
`;

export const MemberHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    gap: 12px;
`;

export const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const MemberAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffe4f0;
    font-size: 24px;
    line-height: 1;
`;

export const MemberName = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #3f2956;
`;

export const MemberRelation = styled.div`
    font-size: 12px;
    color: #9b83af;
`;

export const EditButton = styled.button`
    border: none;
    border-radius: 999px;
    padding: 6px 14px;
    background: #f26ad2;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(242, 106, 210, 0.35);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
    filter: brightness(1.05);
    }
`;

export const EditIcon = styled.span`
    font-size: 12px;
    line-height: 1;
`;

export const MemberInterestBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
`;

export const InterestTag = styled.span`
    padding: 5px 10px;
    border-radius: 999px;
    background: #f7efff;
    color: #5d3c86;
    font-size: 12px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    span {
        font-size: 14px;
        line-height: 1;
    }
`;

/* ------------------- 푸터 메시지 ------------------- */
export const FooterMessageWrapper = styled.div`
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #8a74a0;
    line-height: 1.6;
`;