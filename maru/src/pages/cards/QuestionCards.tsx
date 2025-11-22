import React, { useState } from 'react';
import { QUESTIONS} from './questions.ts';
import * as S from './QuestionCards.style.ts';
import {
    Header,
    IntroSection,
    QuestionCard,
    QuestionNavigation,
    FooterMessage,
    } from './QuestionCards.components.tsx';

const QuestionCards: React.FC = () => {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
    };

    const handleNext = () => {
    if (index === QUESTIONS.length - 1) return;
    setIndex((prev) => prev + 1);
    };

    const handleShuffle = () => {
    if (QUESTIONS.length <= 1) return;

    const others = QUESTIONS
        .map((_, i) => i)
        .filter((i) => i !== index);

    const randomIndex = others[Math.floor(Math.random() * others.length)];
    setIndex(randomIndex);
    };

    return (
    <S.PageWrapper>
        <S.Container>
        <Header />
        <IntroSection />
        <QuestionCard
            index={index}
            total={QUESTIONS.length}
            question={QUESTIONS[index]}
            onShuffle={handleShuffle}
        />
        <QuestionNavigation
            index={index}
            total={QUESTIONS.length}
            onPrev={handlePrev}
            onNext={handleNext}
        />
        <FooterMessage />
        </S.Container>
    </S.PageWrapper>
    );
};

export default QuestionCards;