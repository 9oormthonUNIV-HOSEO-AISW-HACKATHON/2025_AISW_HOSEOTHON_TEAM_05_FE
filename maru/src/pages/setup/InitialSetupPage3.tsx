import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./InitialSetupPage3.style.ts";

interface Activity {
  id: string;
  label: string;
  icon: string;
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tastes?: string[];
  selectedActivities?: Activity[];
  dayNumber?: number;
  dayOfWeek?: string;
}

const dayNames = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

const InitialSetupPage3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** ❗ 항상 컴포넌트 최상단에서 실행 */
  const locationMembers = location.state?.members as Member[] | undefined;

  /** 👉 Hook은 항상 호출되어야 함 */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  /** ❗ locationMembers가 없으면 아래에서 처리 (Hook 아래에서) */
  if (!locationMembers) {
    return <div>잘못된 접근입니다. setup2에서 넘어오지 않았습니다.</div>;
  }

  /** 멤버 데이터 가공 */
  const processedMembers: Member[] = locationMembers.map((m, idx) => ({
    ...m,
    selectedActivities:
      m.tastes?.map((t, i) => ({
        id: `t${i}`,
        label: t,
        icon: "✨",
      })) ?? [],
    dayNumber: idx + 1,
    dayOfWeek: dayNames[idx % 7],
  }));

  const current = processedMembers[currentIndex];

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setShowPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);

    if (currentIndex < processedMembers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/profile", { state: { members: processedMembers } });
    }
  };

  return (
    <S.PageWrapper>

      <S.Header>
        <S.BackButton disabled={currentIndex === 0} onClick={handleBack}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          뒤로
        </S.BackButton>

        <S.ProgressText>
          <span className="current">{currentIndex + 1}</span>/
          <span className="total">{processedMembers.length}</span>
        </S.ProgressText>
      </S.Header>

      <S.ProfileCard>
        <S.AvatarCircle>
          <span>{current.avatar}</span>
        </S.AvatarCircle>

        <S.ProfileInfo>
          <S.MemberName>{current.name}님의 취향</S.MemberName>
          <S.RoleBadge>{current.role}</S.RoleBadge>
        </S.ProfileInfo>
      </S.ProfileCard>

      <S.ActivitiesCard>
        <S.ActivitiesTitle>
          {current.name}님이 선택하신 좋아하는 활동입니다!
        </S.ActivitiesTitle>

        <S.Grid>
          {current.selectedActivities?.map((ac) => (
            <S.ActivityItem key={ac.id}>
              <span className="icon">{ac.icon}</span>
              <span className="label">{ac.label}</span>
            </S.ActivityItem>
          ))}
        </S.Grid>
      </S.ActivitiesCard>

      <S.NextButton onClick={handleNext}>
        다음 구성원
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.5" />
        </svg>
      </S.NextButton>

      {showPopup && (
        <S.PopupOverlay onClick={() => setShowPopup(false)}>
          <S.Popup onClick={(e) => e.stopPropagation()}>
            <S.PopupHeader>
              <S.PopupAvatarCircle>
                <span>{current.avatar}</span>
              </S.PopupAvatarCircle>

              <S.PopupInfo>
                <h2>{current.name}님의 취향</h2>
                <S.PopupRoleBadge>{current.role}</S.PopupRoleBadge>
              </S.PopupInfo>
            </S.PopupHeader>

            <S.PopupContent>
              <p className="day-message">
                당신의 DAY는{" "}
                <span className="day-number">{current.dayNumber}</span>번째입니다!
              </p>

              <p className="day-desc">
                매주{" "}
                <span className="highlight">{current.dayOfWeek}</span>은 당신의 날입니다.
                취향 질문 카드를 통해 가족과 공유해보세요!
              </p>
            </S.PopupContent>

            <S.PopupFooter>
              <S.ConfirmButton onClick={handlePopupConfirm}>
                확인
              </S.ConfirmButton>
            </S.PopupFooter>
          </S.Popup>
        </S.PopupOverlay>
      )}
    </S.PageWrapper>
  );
};

export default InitialSetupPage3;
