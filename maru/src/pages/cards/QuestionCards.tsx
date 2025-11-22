import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { INTEREST_QUESTIONS, GENERAL_QUESTIONS, type QuestionWithInterest } from './questions.ts';
import { type MemberInterests, findTopCommonInterest } from '../Interests/utils/findInterests.ts';
import * as S from './QuestionCards.style.ts';
import {
    Header,
    IntroSection,
    QuestionCard,
    QuestionNavigation,
    FooterMessage,
    } from './QuestionCards.components.tsx';

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

const QuestionCards: React.FC = () => {
    const location = useLocation();
    const locationState = location.state as {
        members?: MemberInterests[];
        topCommon?: { interest: string | null; count: number; members: MemberInterests[] };
        hasCommon?: boolean;
    } | null;

    // 질문 목록 생성
    const questions = useMemo(() => {
        if (!locationState?.members || locationState.members.length === 0) {
            // 데이터가 없으면 일반 질문만 반환
            return GENERAL_QUESTIONS.map(q => ({
                question: q,
                interest: null,
                isCommon: false,
                icon: null,
            }));
        }

        const members = locationState.members;
        const topCommon = locationState.topCommon || findTopCommonInterest(members);
        const hasCommon = topCommon.interest !== null;

        // 모든 구성원의 취향 수집
        const allInterests = new Set<string>();
        members.forEach(m => {
            (m.interests || []).forEach(interest => allInterests.add(interest));
        });

        // 선택되지 않은 취향
        const allPossibleInterests = Object.keys(INTEREST_QUESTIONS);
        const unselectedInterests = allPossibleInterests.filter(
            interest => !allInterests.has(interest)
        );

        const questionList: QuestionWithInterest[] = [];

        if (hasCommon && topCommon.interest) {
            // 공통 취향이 있는 경우: 공통 취향 위주 + 개별 취향 부가적
            // 공통 취향 질문 추가 (강조)
            const commonQuestions = INTEREST_QUESTIONS[topCommon.interest] || [];
            commonQuestions.forEach(q => {
                questionList.push({
                    question: q,
                    interest: topCommon.interest,
                    isCommon: true,
                    icon: INTEREST_ICONS[topCommon.interest] || null,
                });
            });

            // 개별 취향 질문 추가
            members.forEach(member => {
                (member.interests || []).forEach(interest => {
                    if (interest !== topCommon.interest && INTEREST_QUESTIONS[interest]) {
                        const interestQuestions = INTEREST_QUESTIONS[interest];
                        // 각 취향당 1-2개 질문만 추가
                        interestQuestions.slice(0, 2).forEach(q => {
                            questionList.push({
                                question: q,
                                interest: interest,
                                isCommon: false,
                                icon: INTEREST_ICONS[interest] || null,
                            });
                        });
                    }
                });
            });
        } else {
            // 공통 취향이 없는 경우: 개별 취향 위주 + 미선택 취향 부가적
            // 개별 취향 질문 추가
            members.forEach(member => {
                (member.interests || []).forEach(interest => {
                    if (INTEREST_QUESTIONS[interest]) {
                        const interestQuestions = INTEREST_QUESTIONS[interest];
                        interestQuestions.forEach(q => {
                            questionList.push({
                                question: q,
                                interest: interest,
                                isCommon: false,
                                icon: INTEREST_ICONS[interest] || null,
                            });
                        });
                    }
                });
            });

            // 미선택 취향 질문 추가 (부가적)
            unselectedInterests.forEach(interest => {
                if (INTEREST_QUESTIONS[interest]) {
                    const interestQuestions = INTEREST_QUESTIONS[interest];
                    // 미선택 취향은 1개만 추가
                    if (interestQuestions.length > 0) {
                        questionList.push({
                            question: interestQuestions[0],
                            interest: interest,
                            isCommon: false,
                            icon: INTEREST_ICONS[interest] || null,
                        });
                    }
                }
            });
        }

        // 일반 질문 추가
        GENERAL_QUESTIONS.forEach(q => {
            questionList.push({
                question: q,
                interest: null,
                isCommon: false,
                icon: null,
            });
        });

        return questionList;
    }, [locationState]);

    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        if (index === 0) return;
        setIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (index === questions.length - 1) return;
        setIndex((prev) => prev + 1);
    };

    const handleShuffle = () => {
        if (questions.length <= 1) return;

        const others = questions
            .map((_, i) => i)
            .filter((i) => i !== index);

        const randomIndex = others[Math.floor(Math.random() * others.length)];
        setIndex(randomIndex);
    };

    const currentQuestion = questions[index] || {
        question: "질문을 불러올 수 없습니다.",
        interest: null,
        isCommon: false,
        icon: null,
    };

    return (
    <S.PageWrapper>
        <S.Container>
        <Header />
        <IntroSection />
        <QuestionCard
            index={index}
            total={questions.length}
            question={currentQuestion.question}
            interest={currentQuestion.interest}
            isCommon={currentQuestion.isCommon}
            icon={currentQuestion.icon}
            onShuffle={handleShuffle}
        />
        <QuestionNavigation
            index={index}
            total={questions.length}
            onPrev={handlePrev}
            onNext={handleNext}
        />
        <FooterMessage />
        </S.Container>
    </S.PageWrapper>
    );
};

export default QuestionCards;