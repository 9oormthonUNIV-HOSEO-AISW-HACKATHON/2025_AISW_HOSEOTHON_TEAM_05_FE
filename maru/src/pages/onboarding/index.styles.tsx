import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #ffa54c, #ff73c4, #b37bff);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const AnimatedBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

export const CharacterBox = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  margin-bottom: 2rem;
`;

export const PulseCircle = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
`;

export const FamilySVG = styled.svg`
  position: absolute;
  inset: 0;
  margin: auto;
`;

export const TitleText = styled(motion.h1)`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 0.5rem;
`;

export const SubText = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const LoadingBar = styled.div`
  width: 16rem;
  height: 0.25rem;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 2rem;
  border-radius: 9999px;
  overflow: hidden;
`;

export const LoadingFill = styled(motion.div)`
  height: 100%;
  background: white;
  border-radius: 9999px;
`;
