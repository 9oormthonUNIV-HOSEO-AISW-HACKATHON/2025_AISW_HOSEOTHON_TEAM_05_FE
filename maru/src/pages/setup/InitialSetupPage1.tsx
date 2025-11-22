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

  return (
    <S.PageWrapper>
      <S.Container>
        <S.Header>
          <S.Title>가족 구성원 설정</S.Title>
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
    </S.PageWrapper>
  );
};

export default InitialSetupPage1;
