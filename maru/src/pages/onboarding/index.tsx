import React, { useEffect } from 'react';
import * as S from './index.styles.tsx';

import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/setup1', { replace: true });
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.Container>
      <S.Logo>
      </S.Logo>

      <S.OnBoardingMaru>
      </S.OnBoardingMaru>
    </S.Container>
  );
};

export default OnBoarding;
