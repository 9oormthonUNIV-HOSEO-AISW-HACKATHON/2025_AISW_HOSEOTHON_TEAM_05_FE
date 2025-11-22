import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./index.styles.tsx";
import { motion } from "framer-motion";

const OnBoarding: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/setup1", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.Wrapper>
      {/* 배경 움직임 */}
      <S.AnimatedBackground
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* 캐릭터 영역 */}
        <S.CharacterBox>
          <S.PulseCircle
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 캐릭터 SVG */}
          <S.FamilySVG width="200" height="200" viewBox="0 0 200 200">
            {/* 부모 하트 */}
            <motion.path
              d="M100 170 C80 150, 40 130, 40 95 C40 75, 55 60, 75 60 C85 60, 95 65, 100 75 C105 65, 115 60, 125 60 C145 60, 160 75, 160 95 C160 130, 120 150, 100 170Z"
              fill="#ffffff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* 왼쪽 자녀 */}
            <motion.path
              d="M60 60 C50 50, 30 40, 30 25 C30 15, 38 8, 48 8 C53 8, 58 11, 60 17 C62 11, 67 8, 72 8 C82 8, 90 15, 90 25 C90 40, 70 50, 60 60Z"
              fill="#ffeb3b"
              initial={{ scale: 0, x: 20, y: 20, opacity: 0 }}
              animate={{ scale: [0, 1.1, 1], x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* 오른쪽 자녀 */}
            <motion.path
              d="M140 60 C130 50, 110 40, 110 25 C110 15, 118 8, 128 8 C133 8, 138 11, 140 17 C142 11, 147 8, 152 8 C162 8, 170 15, 170 25 C170 40, 150 50, 140 60Z"
              fill="#64ffda"
              initial={{ scale: 0, x: -20, y: 20, opacity: 0 }}
              animate={{ scale: [0, 1.1, 1], x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </S.FamilySVG>
        </S.CharacterBox>

        {/* 메인텍스트 */}
        <S.TitleText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          가족의 마음을 잇다
        </S.TitleText>

        <S.SubText
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          세대를 연결하는 특별한 시간
        </S.SubText>

        {/* 로딩바 */}
        <S.LoadingBar>
          <S.LoadingFill
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8 }}
          />
        </S.LoadingBar>
      </div>
    </S.Wrapper>
  );
};

export default OnBoarding;
