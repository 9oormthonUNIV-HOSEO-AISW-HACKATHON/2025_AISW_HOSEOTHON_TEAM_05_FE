import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import * as S from './InitialSetupPage1.style.ts';

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const roles = ["아빠", "엄마", "할아버지", "할머니", "아들", "딸", "형제", "자매", "기타"];
const avatars = ["👨", "👩", "👴", "👵", "👦", "👧", "👶", "🧑"];

const InitialSetupPage1: React.FC = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState<Member[]>([]);
  const [currentMember, setCurrentMember] = useState<Member>({
    id: 0,
    name: "",
    role: "",
    avatar: "",
  });
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [familyCode, setFamilyCode] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMember({ ...currentMember, name: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setCurrentMember({ ...currentMember, role });
  };

  const handleAvatarChange = (avatar: string) => {
    setCurrentMember({ ...currentMember, avatar });
  };

  const handleAddMember = () => {
    if (!currentMember.name || !currentMember.role) {
      alert("이름과 역할을 입력해주세요.");
      return;
    }

    const newMember: Member = {
      id: members.length + 1,
      name: currentMember.name,
      role: currentMember.role,
      avatar: currentMember.avatar || "👤",
    };

    setMembers([...members, newMember]);

    setCurrentMember({ id: 0, name: "", role: "", avatar: "" });
  };

  const handleNext = () => {
    if (members.length < 2) {
      alert("최소 2명의 가족 구성원을 추가해주세요!");
      return;
    }

    // 👉 Setup2로 이동하면서 구성원 목록 전달
    navigate("/setup2", {
      state: { members }
    });
  };

  const handleCodeSubmit = () => {
    const trimmedCode = familyCode.trim().toUpperCase();
    if (!trimmedCode || trimmedCode.length < 2) {
      alert("가족 코드는 최소 2자리 이상 입력해주세요.");
      return;
    }

    // 가족 코드를 localStorage에 저장
    localStorage.setItem('familyCode', trimmedCode);
    setShowCodeModal(false);
    setFamilyCode("");
    alert("가족 코드가 저장되었습니다.");
  };

  return (
    <S.PageWrapper>
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <S.Title>가족 구성원 설정</S.Title>
            <S.CodeButton onClick={() => setShowCodeModal(true)}>
              가족 코드 입력
            </S.CodeButton>
          </S.HeaderTop>
          <S.Subtitle>우리 가족 구성원을 추가해주세요 (최소 2명)</S.Subtitle>
        </S.Header>

        <S.Form>
          <S.FormSection>
            <S.Label>이름</S.Label>
            <S.Input
              type="text"
              placeholder="이름을 입력하세요"
              value={currentMember.name}
              onChange={handleNameChange}
            />
          </S.FormSection>

          <S.FormSection>
            <S.Label>역할</S.Label>
            <S.RoleGrid>
              {roles.map((role) => (
                <S.RoleBtn
                  key={role}
                  active={currentMember.role === role}
                  onClick={() => handleRoleChange(role)}
                >
                  {role}
                </S.RoleBtn>
              ))}
            </S.RoleGrid>
          </S.FormSection>

          <S.FormSection>
            <S.Label>아바타</S.Label>
            <S.AvatarGrid>
              {avatars.map((avatar) => (
                <S.AvatarBtn
                  key={avatar}
                  active={currentMember.avatar === avatar}
                  onClick={() => handleAvatarChange(avatar)}
                >
                  {avatar}
                </S.AvatarBtn>
              ))}
            </S.AvatarGrid>
          </S.FormSection>

          <S.AddBtn onClick={handleAddMember}>구성원 추가</S.AddBtn>
        </S.Form>

        {members.length > 0 && (
          <S.MembersWrapper>
            <h3>추가된 구성원</h3>
            <S.MembersGrid>
              {members.map((member) => (
                <S.MemberCard key={member.id}>
                  <S.MemberAvatar>{member.avatar}</S.MemberAvatar>
                  <S.MemberName>{member.name}</S.MemberName>
                  <S.MemberRole>{member.role}</S.MemberRole>
                </S.MemberCard>
              ))}
            </S.MembersGrid>
          </S.MembersWrapper>
        )}

        <S.Footer>
          <S.NextBtn disabled={members.length < 2} onClick={handleNext}>
            다음 단계로 <S.ArrowIcon>→</S.ArrowIcon>
          </S.NextBtn>
        </S.Footer>
      </S.Container>

      {/* 가족 코드 입력 모달 */}
      {showCodeModal && (
        <S.ModalOverlay onClick={() => setShowCodeModal(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>가족 코드 입력</S.ModalTitle>
              <S.CloseButton onClick={() => setShowCodeModal(false)}>×</S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalLabel>가족 코드를 입력하세요</S.ModalLabel>
              <S.ModalInput
                type="text"
                placeholder="가족 코드 입력"
                value={familyCode}
                onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
              />
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalCancelButton onClick={() => setShowCodeModal(false)}>
                취소
              </S.ModalCancelButton>
              <S.ModalSubmitButton onClick={handleCodeSubmit}>
                확인
              </S.ModalSubmitButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
};

export default InitialSetupPage1;
