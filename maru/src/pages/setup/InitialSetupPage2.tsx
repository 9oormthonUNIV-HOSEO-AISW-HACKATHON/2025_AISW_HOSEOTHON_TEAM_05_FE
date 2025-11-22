import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./InitialSetupPage2.style.ts";

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[]; // 구성원이 선택한 취향
}

const tasteOptions = [
  { icon: "🎬", text: "영화 감상" },
  { icon: "🎵", text: "음악 듣기" },
  { icon: "🍳", text: "요리하기" },
  { icon: "🚶‍♂️", text: "산책하기" },
  { icon: "📚", text: "독서" },
  { icon: "🎮", text: "게임" },
  { icon: "✈️", text: "여행" },
  { icon: "⚽", text: "운동" },
  { icon: "✂️", text: "공예/DIY" },
  { icon: "🌱", text: "가드닝" },
  { icon: "☕", text: "카페 가기" },
  { icon: "📺", text: "TV/드라마" },
];

const InitialSetupPage2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** setup1 → navigate("/setup2", { state: { members } }) */
  const { members } = location.state as { members: Member[] };

  const [index, setIndex] = useState(0);

  /** 현재 구성원의 이전 선택이 있으면 복원 */
  const [tastes, setTastes] = useState<string[]>(members[0].tastes ?? []);

  const current = members[index];

  /** 취향 선택 토글 */
  const toggleTaste = (taste: string) => {
    setTastes((prev) =>
      prev.includes(taste)
        ? prev.filter((t) => t !== taste)
        : [...prev, taste]
    );
  };

  /** 다음 구성원으로 이동 */
  const nextMember = () => {
    // 현재 구성원에 취향 저장
    members[index].tastes = tastes;

    // 마지막 구성원이면 Setup3로 이동
    if (index >= members.length - 1) {
      navigate("/setup3", { state: { members } });
      return;
    }

    // 다음 구성원으로 이동
    const nextIndex = index + 1;
    setIndex(nextIndex);

    // 다음 구성원 취향 복원
    setTastes(members[nextIndex].tastes ?? []);
  };

  /** 뒤로가기 */
  const handleBack = () => {
    if (index === 0) return;

    // 현재 구성원 데이터 저장
    members[index].tastes = tastes;

    const prev = index - 1;
    setIndex(prev);

    // 이전 구성원의 취향 복원
    setTastes(members[prev].tastes ?? []);
  };

  return (
    <S.PageWrapper>
      <S.Container>

        {/* 헤더 */}
        <S.Header>
          <S.BackBtn disabled={index === 0} onClick={handleBack}>
            ←
          </S.BackBtn>
          <S.Title>
            {index + 1} / {members.length}
          </S.Title>
          <S.ProgressText />
        </S.Header>

        {/* 프로필 영역 */}
        <S.ProfileBox>
          <S.Avatar>{current.avatar}</S.Avatar>
          <S.ProfileInfo>
            <S.Name>{current.name}의 취향</S.Name>
            <S.RoleTag>{current.role}</S.RoleTag>
          </S.ProfileInfo>
        </S.ProfileBox>

        {/* 취향 선택 영역 */}
        <S.CategoryWrapper>
          <S.CategoryBlock>
            <S.CategoryHeader>
              <S.CategoryTitle>좋아하는 활동을 선택해주세요</S.CategoryTitle>
              <S.SelectedCount>{tastes.length}개 선택</S.SelectedCount>
            </S.CategoryHeader>

            <S.TasteGrid>
              {tasteOptions.map((opt) => (
                <S.TasteBtn
                  key={opt.text}
                  selected={tastes.includes(opt.text)}
                  onClick={() => toggleTaste(opt.text)}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.text}</span>
                </S.TasteBtn>
              ))}
            </S.TasteGrid>
          </S.CategoryBlock>
        </S.CategoryWrapper>

        {/* 버튼 */}
        <S.Footer>
          <S.NextBtn disabled={tastes.length < 1} onClick={nextMember}>
            {index < members.length - 1 ? "다음 구성원 →" : "완료 →"}
          </S.NextBtn>
        </S.Footer>

      </S.Container>
    </S.PageWrapper>
  );
};

export default InitialSetupPage2;
