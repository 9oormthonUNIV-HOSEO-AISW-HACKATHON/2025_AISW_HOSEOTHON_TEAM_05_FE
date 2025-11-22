import React from "react";
import styled from "styled-components";

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

type InterestsModalProps = {
    isOpen: boolean;
    memberName: string;
    relation?: string;
    selectedInterests: string[];
    allInterests: string[];
    onChange: (nextInterests: string[]) => void;
    onClose: () => void;
    onSave: () => void;
};

const InterestsModal: React.FC<InterestsModalProps> = ({
    isOpen,
    memberName,
    relation,
    selectedInterests,
    allInterests,
    onChange,
    onClose,
    onSave,
}) => {
    if (!isOpen) return null;

    const handleToggleInterest = (interest: string) => {
    const exists = selectedInterests.includes(interest);
    if (exists) {
        onChange(selectedInterests.filter((i) => i !== interest));
    } else {
        onChange([...selectedInterests, interest]);
    }
    };

    const handleSave = () => {
    if (selectedInterests.length === 0) return;
    onSave();
    };

    return (
    <Overlay onClick={onClose}>
        <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="interests-modal-title"
        onClick={(e) => e.stopPropagation()}
        >
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
            <Title id="interests-modal-title">
            {memberName}님의 취향 수정
            </Title>
            {relation && <RelationText>{relation}</RelationText>}
            <Subtitle>좋아하는 활동을 선택해주세요 (최소 1개)</Subtitle>
        </Header>

        <Body>
            <InterestGrid>
            {allInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                const icon = INTEREST_ICONS[interest] || "⭐";
                return (
                <InterestItem
                    key={interest}
                    type="button"
                    $selected={isSelected}
                    onClick={() => handleToggleInterest(interest)}
                >
                    <Checkbox $checked={isSelected}>
                    {isSelected && "✓"}
                    </Checkbox>
                    <InterestIcon>{icon}</InterestIcon>
                    <InterestText>{interest}</InterestText>
                </InterestItem>
                );
            })}
            </InterestGrid>
        </Body>

        <Footer>
            <SecondaryButton type="button" onClick={onClose}>
            취소
            </SecondaryButton>
            <PrimaryButton
            type="button"
            onClick={handleSave}
            disabled={selectedInterests.length === 0}
            >
            저장
            </PrimaryButton>
        </Footer>
        </Dialog>
    </Overlay>
    );
};

export default InterestsModal;

/* ------------------- styled-components ------------------- */

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.32);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    box-sizing: border-box;
`;

const Dialog = styled.div`
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border-radius: 24px;
    border: 2px solid #e0d4f0;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
    padding: 22px 20px 18px;
    box-sizing: border-box;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    font-size: 24px;
    color: #8b739e;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.15s ease-out;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`;

const Header = styled.header`
    margin-bottom: 16px;
    padding-right: 40px;
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #3d274f;
    margin: 0 0 6px;
`;

const RelationText = styled.p`
    margin: 0 0 8px;
    font-size: 14px;
    color: #5c3a82;
    font-weight: 500;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 13px;
    color: #8b739e;
`;

const Body = styled.div`
    margin-top: 6px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 4px;
`;

const InterestGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
`;

const InterestItem = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid ${({ $selected }) => ($selected ? "#f26ad2" : "#e0d4f0")};
    border-radius: 12px;
    background: ${({ $selected }) => ($selected ? "#fff0f8" : "#ffffff")};
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-align: left;

    &:hover {
        border-color: #f26ad2;
        background: #fff0f8;
    }
`;

const Checkbox = styled.div<{ $checked: boolean }>`
    width: 20px;
    height: 20px;
    border: 2px solid ${({ $checked }) => ($checked ? "#f26ad2" : "#d0c0e0")};
    border-radius: 4px;
    background: ${({ $checked }) => ($checked ? "#f26ad2" : "#ffffff")};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
`;

const InterestIcon = styled.span`
    font-size: 20px;
    line-height: 1;
    flex-shrink: 0;
`;

const InterestText = styled.span`
    font-size: 13px;
    color: #3d274f;
    font-weight: 500;
    flex: 1;
`;

const Footer = styled.footer`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const ButtonBase = styled.button`
    min-width: 90px;
    border-radius: 999px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: filter 0.12s ease-out, transform 0.08s ease-out;

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        cursor: default;
        opacity: 0.6;
        transform: none;
        filter: none;
    }
`;

const SecondaryButton = styled(ButtonBase)`
    background: #f4edf9;
    color: #7a5d9a;
`;

const PrimaryButton = styled(ButtonBase)`
    background: #f26ad2;
    color: #ffffff;
    box-shadow: 0 10px 22px rgba(242, 106, 210, 0.4);
`;