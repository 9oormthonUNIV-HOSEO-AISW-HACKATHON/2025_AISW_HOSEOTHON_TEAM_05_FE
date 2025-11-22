import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  min-height: 100vh;

  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.primary.orange400} 0%,
    ${({ theme }) => theme.colors.primary.orange200} 100%
  );
`;

export const Logo = styled.img`
  width: 50%;   
  max-width: 240px; 
  margin-top: auto;
  aspect-ratio: 16.9 / 3.9;
`;

export const OnBoardingMaru = styled.img`
  margin-top: auto;
max-width: 320px;
  height: auto;
`;
