import React from "react";
import * as S from "./Interests.style.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { TopCommonInterest } from "./utils/findInterests.ts";

/* ------------------- 헤더 ------------------- */
export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
    <S.HeaderWrapper>
        <S.BackButton onClick={() => navigate(-1)}>
        <S.BackArrow>←</S.BackArrow>
        뒤로
        </S.BackButton>
    </S.HeaderWrapper>
    );
};

// 취향별 아이콘 매핑
const INTEREST_ICONS: Record<string, string> = {
    "영화/드라마/연극 감상": "🎬",
    "음악 듣기": "🎵",
    "요리하기": "🍳",
    "엑티비티한 활동": "🚶‍♂️",
    "자기개발": "📚",
    "게임": "🎮",
    "여행": "✈️",
    "구단 응원하기": "⚽",
    "공예/DIY": "✂️",
    "맛집 혹은 카페 탐방": "🌱",
};

/* --------------- 상단 부분 --------------- */
export const TopSection: React.FC<{
    hasCommon: boolean;
    topCommon: TopCommonInterest;
}> = ({ hasCommon, topCommon }) => {
    return (
    <S.TopSection>
        <S.TopIcon>✨</S.TopIcon>
        <S.TopTitle>공통 취향 발견!</S.TopTitle>
        <S.TopSubtitle>
        가족 구성원들의 공통 관심사를 찾았어요
        </S.TopSubtitle>

        {hasCommon && topCommon.interest ? (
        <>
            <S.CommonTitleText>공통 취향 TOP 1</S.CommonTitleText>
            <S.CommonBlock>
                <S.CommonIcon>{INTEREST_ICONS[topCommon.interest] || "⭐"}</S.CommonIcon>
                <S.CommonBadge>#1</S.CommonBadge>
                <S.CommonTag>{topCommon.interest}</S.CommonTag>
                <S.MemberTags>
                    {topCommon.members.map((member) => (
                        <S.MemberTag key={member.id}>{member.name}</S.MemberTag>
                    ))}
                </S.MemberTags>
            </S.CommonBlock>
        </>
        ) : (
        <S.NoCommonBox>
            <p>아쉽게도 공통 취향을 찾지 못했어요.</p>
            <p>하지만 서로의 다른 취향을 알아가는 것도 좋은 시작이에요!</p>
        </S.NoCommonBox>
        )}
    </S.TopSection>
    );
};

/* ------------------- Next Step Buttons ------------------- */
export const NextStepSection: React.FC<{
    onOpenCards: () => void;
    onOpenRecord: () => void;
}> = ({ onOpenCards, onOpenRecord }) => {
    const navigate = useNavigate();
    return (
    <S.NextStepSection>
        <S.NextButton onClick={onOpenCards}>
        💬 대화 시작하기
        <span>공통 취향으로 대화 질문 받기</span>
        </S.NextButton>

        <S.NextButtonSecondary onClick={() => navigate('/추억 타임라인')}>
        ❤️ 추억 기록하기
        <span>함께한 순간을 타임라인에 남기기</span>
        </S.NextButtonSecondary>
    </S.NextStepSection>
    );
};

/* ------------------- 취향 확인 ------------------- */
export const MemberInterestCard: React.FC<{
    name: string;
    relation: string;
    avatar: string;
    interests: string[];
    isEditable: boolean;
    onEdit?: () => void;
}> = ({ name, relation, avatar, interests, isEditable, onEdit }) => {
    return (
    <S.MemberCardWrapper>
        <S.MemberHeader>
        <S.MemberInfo>
            <S.MemberAvatar>{avatar}</S.MemberAvatar>
            <div>
            <S.MemberName>{name} {isEditable && "(나)"}</S.MemberName>
            <S.MemberRelation>{relation}</S.MemberRelation>
            </div>
        </S.MemberInfo>

        {isEditable && onEdit && (
            <S.EditButton onClick={onEdit}>
                <S.EditIcon>✏️</S.EditIcon>
                수정
            </S.EditButton>
        )}
        </S.MemberHeader>

        <S.MemberInterestBox>
        {interests.map((i) => (
            <S.InterestTag key={i}>
                {INTEREST_ICONS[i] && <span>{INTEREST_ICONS[i]}</span>}
                {i}
            </S.InterestTag>
        ))}
        </S.MemberInterestBox>
    </S.MemberCardWrapper>
    );
};

/* ------------------- 하단 부분 ------------------- */
export const FooterMessage: React.FC = () => {
    return (
    <S.FooterMessageWrapper>
        취향은 변할 수도 있어요!
        <br />
        언제든지 구성원의 관심사를 수정해보세요 😊
    </S.FooterMessageWrapper>
    );
};