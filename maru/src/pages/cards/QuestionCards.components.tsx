import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './QuestionCards.style.ts';

/* ------------------- 헤더 ------------------- */
export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
    <S.HeaderBar>
        <S.BackButton onClick={() => navigate(-1)}>
        <S.BackArrow>←</S.BackArrow>
        <span>뒤로</span>
        </S.BackButton>

        <S.RecordButton>추억 기록하기</S.RecordButton>
    </S.HeaderBar>
    );
};

/* ------------------- 상단 부분 ------------------- */
export const IntroSection: React.FC = () => {
    return (
    <S.IntroSection>
        <S.IntroIconWrapper>💬</S.IntroIconWrapper>
        <S.IntroTitle>대화 시작 질문 카드</S.IntroTitle>
        <S.IntroSubtitle>다양한 주제로 대화를 시작해보세요</S.IntroSubtitle>
    </S.IntroSection>
    );
};

/* ------------------- 질문 카드 ------------------- */
export const QuestionCard = ({
    index,
    total,
    question,
    onShuffle,
}: {
    index: number;
    total: number;
    question: string;
    onShuffle: () => void;
}) => {
    return (
    <S.CardSection>
        <S.CardHeader>
        <S.CategoryIcon>🎬</S.CategoryIcon>
        <S.QuestionMeta>
            <span>✨</span>
            <S.QuestionIndex>
            질문 {index + 1} / {total}
            </S.QuestionIndex>
        </S.QuestionMeta>
        </S.CardHeader>

        <S.QuestionText>{question}</S.QuestionText>

        <S.ShuffleButton onClick={onShuffle}>🔄 다른 질문</S.ShuffleButton>
    </S.CardSection>
    );
};

/* ------------------- 질문 버튼 ------------------- */
export const QuestionNavigation = ({
    index,
    total,
    onPrev,
    onNext,
}: {
    index: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}) => {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
    <S.NavWrapper>
        <S.NavButton onClick={onPrev} disabled={isFirst}>
        이전
        </S.NavButton>

        <S.NavButtonPrimary onClick={onNext} disabled={isLast}>
        다음
        </S.NavButtonPrimary>
    </S.NavWrapper>
    );
};

/* ------------------- 하단 부분 ------------------- */
export const FooterMessage: React.FC = () => {
    return (
    <S.FooterMessageWrapper>
        💡 이 질문들로 가족과 대화를 시작해보세요.
        <br />
        함께한 순간은 추억 타임라인에 기록할 수 있어요!
    </S.FooterMessageWrapper>
    );
};