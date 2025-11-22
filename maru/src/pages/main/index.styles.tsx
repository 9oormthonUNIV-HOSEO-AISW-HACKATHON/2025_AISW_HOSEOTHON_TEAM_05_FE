import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2.4rem;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background: #ffffff;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 4rem;
  color: ${({ theme }) => theme.colors.primary.orange400};
`;

export const Desc = styled.p`
  font-size: 1.6rem;
  margin-top: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.basic.gray};
`;

export const CodeBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;

  width: 100%;
  max-width: 320px;

  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary.orange200};

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 1.8rem;
  font-weight: 600;
`;

export const ShareButton = styled.button`
  margin-top: 2.4rem;
  padding: 1.2rem 1.6rem;

  width: 100%;
  max-width: 320px;

  background: #FEE500;
  border: none;
  border-radius: 10px;

  color: #3A1D1D;
  font-size: 1.6rem;
  font-weight: 600;

  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;
export const Input = styled.input`
  margin-top: 2rem;
  width: 100%;
  max-width: 320px;

  padding: 1.2rem 1.4rem;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.basic.light_gray};

  font-size: 1.6rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.orange400};
  }
`;
