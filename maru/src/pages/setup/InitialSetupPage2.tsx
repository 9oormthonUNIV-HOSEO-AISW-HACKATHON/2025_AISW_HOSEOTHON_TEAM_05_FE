import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./InitialSetupPage2.style.ts";

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[];
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

  const { members } = location.state as { members: Member[] };

  const [index, setIndex] = useState(0);
  const [tastes, setTastes] = useState<string[]>([]);

  const current = members[index];

  const toggleTaste = (taste: string) => {
    setTastes((prev) =>
      prev.includes(taste)
        ? prev.filter((t) => t !== taste)
        : [...prev, taste]
    );
  };

  const nextMember = () => {
    members[index].tastes = tastes;

    if (index < members.length - 1) {
      setIndex(index + 1);
      setTastes([]);
    } else {
      console.log("전체 구성원 취향 설정 완료:", members);
      navigate("/main", { state: { members } });
    }
  };

  return (
    <S.PageWrapper>
      <S.Container>
        <S.Header>
          <S.BackBtn disabled={index === 0} onClick={() => setIndex(index - 1)}>
            ←
          </S.BackBtn>
          <S.Title>{index + 1} / {members.length}</S.Title>
          <S.ProgressText />
        </S.Header>

        <S.ProfileBox>
          <S.Avatar>{current.avatar}</S.Avatar>
          <S.ProfileInfo>
            <S.Name>{current.name}의 취향</S.Name>
            <S.RoleTag>{current.role}</S.RoleTag>
          </S.ProfileInfo>
        </S.ProfileBox>

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
