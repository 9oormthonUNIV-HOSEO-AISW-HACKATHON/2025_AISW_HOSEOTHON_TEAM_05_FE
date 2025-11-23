import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./index.style.tsx";

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[];
}

const roles = ["아빠", "엄마", "할아버지", "할머니", "아들", "딸", "형제", "자매", "기타"];
const avatarList = ["👨", "👩", "🧓", "👵", "👦", "👧", "🧑", "👱", "👨‍🦳", "👩‍🦳"];

const FamilyConnectPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as { members?: Member[] } | null | undefined;
  const initialMembers = locationState?.members;

  // localStorage에서 가족 구성원 데이터 가져오기 (state가 없을 경우)
  const getMembersFromStorage = (): Member[] => {
    try {
      const stored = localStorage.getItem('familyMembers');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse members from localStorage', e);
    }
    return [];
  };

  const membersFromState = initialMembers || [];
  const membersFromStorage = getMembersFromStorage();
  const finalInitialMembers = membersFromState.length > 0 ? membersFromState : membersFromStorage;

  const [members, setMembers] = useState<Member[]>(finalInitialMembers);

  // currentMember가 없으면 기본값 설정
  const defaultMember: Member = {
    id: 0,
    name: "사용자",
    role: "기타",
    avatar: "👤",
  };

  const [currentMember, setCurrentMember] = useState<Member>(
    finalInitialMembers.length > 0 ? finalInitialMembers[0] : defaultMember
  );
  const [showSwitchPopup, setShowSwitchPopup] = useState(false);
  const [showEditSelectPopup, setShowEditSelectPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const [editTarget, setEditTarget] = useState<Member | null>(null);
  
  // 가족 코드 가져오기 (localStorage 또는 기본값)
  const [familyCode] = useState(() => {
    const stored = localStorage.getItem('familyCode');
    return stored || '76EVBPSH';
  });

  /* =========================================
      🔥 프로필 삭제 기능
  ========================================= */
  const handleDelete = () => {
    if (!editTarget) return;

    // 최소 2명 이상이어야 삭제 가능
    if (members.length <= 2) {
      alert("최소 2명의 가족 구성원이 필요합니다. 삭제할 수 없습니다.");
      return;
    }

    const updated = members.filter((m) => m.id !== editTarget.id);
    setMembers(updated);

    // 삭제 후 팝업 닫기
    setShowAvatarPopup(false);
    setShowEditPopup(false);
    setShowEditSelectPopup(false);

    // 삭제된 멤버가 현재 선택된 멤버였다면 변경
    if (currentMember.id === editTarget.id) {
      if (updated.length > 0) {
        setCurrentMember(updated[0]);
      } else {
        alert("모든 프로필이 삭제되었습니다. 초기 설정 화면으로 돌아갑니다.");
        navigate("/setup1");
      }
    }
  };

  /* =========================================
      편집 로직
  ========================================= */
  const openEditPopup = (m: Member) => {
    setEditTarget(m);
    setShowEditSelectPopup(false);
    setShowEditPopup(true);
  };

  const saveEdit = () => {
    if (!editTarget) return;

    // 즉시 반영
    const updatedMembers = members.map((m) => 
      m.id === editTarget.id ? editTarget : m
    );
    setMembers(updatedMembers);

    // 현재 멤버도 즉시 업데이트
    if (currentMember.id === editTarget.id) {
      setCurrentMember(editTarget);
    }

    setShowEditPopup(false);
    setShowEditSelectPopup(false);
  };

  return (
    <S.PageWrapper>
      {/* HEADER */}
      <S.Header>
        <S.ProfileBox>
          <S.ProfileImage>{currentMember.avatar}</S.ProfileImage>
          <S.ProfileName>{currentMember.name}</S.ProfileName>
        </S.ProfileBox>

        <S.HeaderButtons>
          <S.SmallButton onClick={() => setShowSwitchPopup(true)}>프로필 전환</S.SmallButton>
          <S.SmallButton onClick={() => setShowEditSelectPopup(true)}>
            프로필 편집
          </S.SmallButton>
        </S.HeaderButtons>
      </S.Header>

      {/* CENTER */}
      <S.CenterBox>
        <S.MainIcon>💗</S.MainIcon>
        <S.MainTitle>가족 연결</S.MainTitle>
        <S.MainDesc>
          가족 구성원들의 취향을 이해하고 <br />
          대화를 시작하며 추억을 공유하세요
        </S.MainDesc>
      </S.CenterBox>

      {/* 기능 카드 리스트 */}
      <S.CardList>
        <S.Card onClick={() => navigate("/interests", { state: { members, currentMemberId: currentMember.id } })}>
          <S.CardIcon>💖</S.CardIcon>
          <S.CardTitle>공통 취향 발견</S.CardTitle>
          <S.CardDesc>가족 구성원의 취향을 분석해 공통 관심사 TOP3 제공</S.CardDesc>
        </S.Card>

        <S.Card onClick={() => navigate("/cards")}>
          <S.CardIcon>💬</S.CardIcon>
          <S.CardTitle>대화 시작 카드</S.CardTitle>
          <S.CardDesc>공통 취향 기반 맞춤형 대화 카드 제공</S.CardDesc>
        </S.Card>

        <S.Card onClick={() => navigate("/feed", { state: { members } })}>
          <S.CardIcon>📸</S.CardIcon>
          <S.CardTitle>추억 타임라인</S.CardTitle>
          <S.CardDesc>가족과의 기록을 모아두는 추억 보관함</S.CardDesc>
        </S.Card>
      </S.CardList>

      {/* ======================================================== */}
      {/*                프로필 전환 팝업                           */}
      {/* ======================================================== */}

      {showSwitchPopup && (
        <S.PopupOverlay onClick={() => setShowSwitchPopup(false)}>
          <S.PopupBox onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={() => setShowSwitchPopup(false)}>×</S.CloseButton>
            <S.PopupTitle>누구의 프로필을 사용하시겠어요?</S.PopupTitle>

            <S.PopupGrid>
              {members.map((m) => (
                <S.PopupCard
                  key={m.id}
                  selected={currentMember.id === m.id}
                  onClick={() => {
                    setCurrentMember(m);
                    setShowSwitchPopup(false);
                  }}
                >
                  <S.Checkbox selected={currentMember.id === m.id}>
                    {currentMember.id === m.id && "✓"}
                  </S.Checkbox>
                  <S.PopupAvatar>{m.avatar}</S.PopupAvatar>
                  <S.PopupName>{m.name}</S.PopupName>
                  <S.PopupRole>{m.role}</S.PopupRole>
                </S.PopupCard>
              ))}
            </S.PopupGrid>

            <S.PopupClose onClick={() => setShowSwitchPopup(false)}>닫기</S.PopupClose>
          </S.PopupBox>
        </S.PopupOverlay>
      )}

      {/* ======================================================== */}
      {/*                편집할 프로필 선택 팝업                    */}
      {/* ======================================================== */}

      {showEditSelectPopup && (
        <S.PopupOverlay onClick={() => setShowEditSelectPopup(false)}>
          <S.PopupBox onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={() => setShowEditSelectPopup(false)}>×</S.CloseButton>
            <S.PopupTitle>편집할 프로필을 선택하세요</S.PopupTitle>

            <S.PopupGrid>
              {members.map((m) => (
                <S.PopupCard key={m.id} selected={false} onClick={() => openEditPopup(m)}>
                  <S.PopupAvatar>{m.avatar}</S.PopupAvatar>
                  <S.PopupName>{m.name}</S.PopupName>
                  <S.PopupRole>{m.role}</S.PopupRole>
                </S.PopupCard>
              ))}
            </S.PopupGrid>

            <S.PopupClose onClick={() => setShowEditSelectPopup(false)}>닫기</S.PopupClose>
          </S.PopupBox>
        </S.PopupOverlay>
      )}

      {/* ======================================================== */}
      {/*                     프로필 편집 팝업                      */}
      {/* ======================================================== */}

      {showEditPopup && editTarget && (
        <S.PopupOverlay onClick={() => setShowEditPopup(false)}>
          <S.EditPopup onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={() => setShowEditPopup(false)}>×</S.CloseButton>
            <S.PopupTitle>프로필 편집</S.PopupTitle>

            <S.EditAvatarBox onClick={() => setShowAvatarPopup(true)}>
              <S.EditAvatar>{editTarget.avatar}</S.EditAvatar>
              <S.AvatarHint>아바타를 클릭하여 변경</S.AvatarHint>
            </S.EditAvatarBox>

            <S.EditLabel>이름</S.EditLabel>
            <S.EditInput
              value={editTarget.name}
              onChange={(e) => setEditTarget({ ...editTarget, name: e.target.value })}
            />

            <S.EditLabel>역할</S.EditLabel>
            <S.RoleGrid>
              {roles.map((r) => (
                <S.RoleButton
                  key={r}
                  active={editTarget.role === r}
                  onClick={() => setEditTarget({ ...editTarget, role: r })}
                >
                  {r}
                </S.RoleButton>
              ))}
            </S.RoleGrid>

            {/* 🔥 삭제 기능 */}
            <S.EditButtonRow>
              <S.DeleteButton 
                onClick={handleDelete}
                disabled={members.length <= 2}
              >
                🗑️ 삭제
              </S.DeleteButton>
              <S.SaveButton onClick={saveEdit}>완료</S.SaveButton>
            </S.EditButtonRow>
          </S.EditPopup>
        </S.PopupOverlay>
      )}

      {/* ======================================================== */}
      {/*                     아바타 선택 팝업                      */}
      {/* ======================================================== */}

      {showAvatarPopup && editTarget && (
        <S.PopupOverlay onClick={() => setShowAvatarPopup(false)}>
          <S.AvatarPopup onClick={(e) => e.stopPropagation()}>
            <S.CloseButton onClick={() => setShowAvatarPopup(false)}>×</S.CloseButton>
            <S.PopupTitle>아바타 선택</S.PopupTitle>

            <S.AvatarGrid>
              {avatarList.map((av) => (
                <S.AvatarItem
                  key={av}
                  selected={editTarget.avatar === av}
                  onClick={() => {
                    setEditTarget({ ...editTarget, avatar: av });
                    setShowAvatarPopup(false);
                  }}
                >
                  {av}
                </S.AvatarItem>
              ))}
            </S.AvatarGrid>

            <S.PopupClose onClick={() => setShowAvatarPopup(false)}>닫기</S.PopupClose>
          </S.AvatarPopup>
        </S.PopupOverlay>
      )}

      {/* 가족 코드 표시 */}
      <S.FamilyCodeSection>
        <S.FamilyCodeLabel>가족 코드</S.FamilyCodeLabel>
        <S.FamilyCodeValue>{familyCode}</S.FamilyCodeValue>
      </S.FamilyCodeSection>
    </S.PageWrapper>
  );
};

export default FamilyConnectPage;
