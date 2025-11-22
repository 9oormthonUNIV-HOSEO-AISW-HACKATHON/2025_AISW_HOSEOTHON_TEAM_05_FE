import React, { useState, useEffect } from "react";
import * as S from "./Interests.style.ts";
import {
    Header,
    TopSection,
    NextStepSection,
    MemberInterestCard,
    FooterMessage,
} from "./Interests.components.tsx";
import InterestsModal from "./InterestsModal.tsx";
import { findTopCommonInterest, type MemberInterests } from "./utils/findInterests.ts";
import { useNavigate, useLocation } from "react-router-dom";

/* ---------------------------------------------
    - 공통 취향 계산
    - 구성원 취향 렌더링
    - 수정 모달 관리
---------------------------------------------- */


const ALL_INTERESTS = [
    "영화/드라마/연극 감상",
    "음악 듣기",
    "요리하기",
    "엑티비티한 활동",
    "자기개발",
    "게임",
    "여행",
    "구단 응원하기",
    "공예/DIY",
    "맛집 혹은 카페 탐방",
];

// Setup 페이지에서 받은 데이터 형식
interface SetupMember {
    id: number;
    name: string;
    role: string;
    avatar: string;
    tastes?: Array<{ icon: string; text: string }>;
    interests?: string[];
}

const InterestsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as { 
        members?: SetupMember[] | MemberInterests[];
        currentMemberId?: number;
    } | null;

    // 데이터 변환: setup 형식(tastes) → interests 형식
    const transformMembers = (rawMembers: SetupMember[] | MemberInterests[]): MemberInterests[] => {
        return rawMembers.map((m) => {
            // 이미 MemberInterests 형식이면 그대로 사용 (tastes가 없고 interests가 있으면)
            if (!('tastes' in m) && 'interests' in m && Array.isArray(m.interests)) {
                return m as MemberInterests;
            }
            // Setup 형식이면 변환
            const setupMember = m as SetupMember;
            const interests = setupMember.tastes 
                ? setupMember.tastes.map(t => t.text)
                : (setupMember.interests || []);
            
            return {
                id: setupMember.id,
                name: setupMember.name,
                relation: setupMember.role,
                avatar: setupMember.avatar,
                interests: interests,
            };
        });
    };

    const [members, setMembers] = useState<MemberInterests[]>(() => {
        if (!locationState?.members) return [];
        return transformMembers(locationState.members);
    });

    const currentMemberId = locationState?.currentMemberId ?? (members.length > 0 ? members[0].id : null);

  // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<MemberInterests | null>(
    null
    );
    const [editedInterests, setEditedInterests] = useState<string[]>([]);

  // 공통 취향 계산
    const safeMembers = members.map((m) => ({
        ...m,
        interests: m.interests || [],
    }));

    const topCommon = safeMembers.length
        ? findTopCommonInterest(safeMembers)
        : { interest: null, count: 0, members: [] };

    const hasCommon = topCommon.interest !== null;

    useEffect(() => {
        if (!locationState?.members) {
            // 셋업/프로필에서 데이터 없이 직접 접근한 경우 프로필로 되돌리기
            navigate("/profile", { replace: true });
        }
    }, [locationState, navigate]);

  /* ------------------- 모달 관리 ------------------- */

    const openModal = (member: MemberInterests) => {
        setEditingMember(member);
        setEditedInterests(member.interests);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const saveInterests = () => {
        if (!editingMember) return;

        const updated = members.map((m) =>
        m.id === editingMember.id
            ? { ...m, interests: editedInterests }
            : m
        );

        setMembers(updated);
        closeModal();
    };

  /* ------------------- 메인 페이지 ------------------- */

    const handleOpenCards = () => navigate("/cards");
    const handleOpenRecord = () => navigate("/timeline");

return (
    <S.PageWrapper>
    <S.ContentCard>
        {/* 헤더 */}
        <Header />

        {/* 상단 공통 취향 섹션 */}
        <TopSection
            hasCommon={hasCommon}
            topCommon={topCommon}
        />

        {/* 다음 단계 버튼 */}
        <NextStepSection
            onOpenCards={handleOpenCards}
            onOpenRecord={handleOpenRecord}
        />

        {/* 구성원 취향 카드 리스트 */}
        {members.map((member) => {
            const isCurrentUser = member.id === currentMemberId;
            return (
                <MemberInterestCard
                    key={member.id}
                    name={member.name}
                    relation={member.relation || ""}
                    avatar={member.avatar}
                    interests={member.interests || []}
                    isEditable={isCurrentUser}
                    onEdit={isCurrentUser ? () => openModal(member) : undefined}
                />
            );
        })}

        {/* 푸터 메시지 */}
        <FooterMessage />
        </S.ContentCard>

      {/* 취향 수정 모달 */}
    <InterestsModal
        isOpen={isModalOpen}
        memberName={editingMember?.name || ""}
        relation={editingMember?.relation}
        selectedInterests={editedInterests}
        allInterests={ALL_INTERESTS}
        onChange={setEditedInterests}
        onClose={closeModal}
        onSave={saveInterests}
    />
    </S.PageWrapper>
    );
};

export default InterestsPage;