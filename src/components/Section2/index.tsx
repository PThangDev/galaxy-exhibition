import React, { FC } from "react";
import image from "src/assets/images";
import styled, { keyframes } from "styled-components";
import { DURATION_ANIMATION } from "../Common/constants";
import { animateSectionFadeOut } from "../Section1";
type Props = {
  show?: boolean;
  reverse?: boolean;
  hide?: boolean;
};

const Section2: FC<Props> = ({
  show = false,
  reverse = false,
  hide = false,
}) => {
  return (
    <StyledSection2 key={Date.now()}>
      <Box show={show} reverse={reverse} hide={hide}>
        <CircleLargest show={show} reverse={reverse}>
          <Rhombus src={image.rhombus} alt="" position="top"></Rhombus>
          <Rhombus src={image.rhombus} alt="" position="bottom"></Rhombus>
        </CircleLargest>
        <CircleSmaller show={show} reverse={reverse}>
          <Rhombus src={image.rhombus} alt="" position="top"></Rhombus>
          <Rhombus src={image.rhombus} alt="" position="bottom"></Rhombus>
        </CircleSmaller>
        <CircleSmallest show={show} reverse={reverse}>
          <Rhombus src={image.rhombus} alt="" position="top"></Rhombus>
          <Rhombus src={image.rhombus} alt="" position="bottom"></Rhombus>
        </CircleSmallest>
      </Box>
      <Content hide={hide} show={show} reverse={reverse}>
        Welcome to <br /> AR Galactic Exhibition
      </Content>
    </StyledSection2>
  );
};

// Keyframes
const animateCircleLargest = keyframes`
  0% {
    transform: rotate(-60deg);
  }
  100% {
    transform: rotate(-30deg);
  }
`;
const animateCircleSmaller = keyframes`
0% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-45deg);
  }`;
const animateCircleSmallest = keyframes`
0% {
    transform: rotate(-35deg);
  }
  100% {
    transform: rotate(15deg);
  }
`;
const animateBoxZoomShow = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
`;

const animateZoomOut = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`;
const animateFadeIn = keyframes`
  0%{
    transform: translate(-50%, -50%) scale(0) ;
    opacity: 0.3;
  }
  100% {
    transform:translate(-50%, -50%) scale(1) ;
    opacity: 1;
  }
`;
// Animation

// Styled components
interface RhombusProps {
  position: "top" | "bottom";
}
interface StatusAnimation {
  show?: boolean;
  hide?: boolean;
  reverse?: boolean;
}

// Set Animation
const setAnimationBoxName = ({ show, hide }: StatusAnimation) => {
  if (show) {
    return animateBoxZoomShow;
  }
  if (hide) {
    return animateZoomOut;
  } else {
    return "";
  }
};
const setAnimationCircleName = ({ show, hide }: StatusAnimation) => {};

const StyledSection2 = styled.section`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
  position: relative;
`;
/* animation-name: ${({ hide }) =>
  hide ? animateZoomOut : animateBoxZoomShow}; */
const Box = styled.div<Props>`
  width: 774px;
  height: 774px;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;

  animation-name: ${({ show, hide }) => setAnimationBoxName({ show, hide })};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};

  animation-timing-function: ease-in-out;

  @media screen and (${({ theme }) => theme.breakpoint.lg}) {
    width: 680px;
    height: 680px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    width: 500px;
    height: 500px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    width: 380px;
    height: 380px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.xs}) {
    width: 320px;
    height: 320px;
  }
  /* animation: ${animateZoomOut} 5s infinite ease-in-out; */
`;
const Rhombus = styled.img<RhombusProps>`
  position: absolute;
  top: ${(props) => (props.position === "top" ? 0 : "100%")};
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    width: 20px;
  }
`;
const Circle = styled.div`
  border: 1px dashed hsla(0, 0%, 100%, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
`;
const CircleLargest = styled(Circle)<StatusAnimation>`
  -webkit-transform: rotate(30deg);
  transform: rotate(-30deg);
  display: flex;
  align-items: center;
  justify-content: center;

  animation-name: ${({ show, hide }) => (show ? animateCircleLargest : "")};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;
`;
const CircleSmaller = styled(Circle)<StatusAnimation>`
  width: 78%;
  height: 78%;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;

  animation-name: ${({ show }) => (show ? animateCircleSmaller : "")};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;
`;
const CircleSmallest = styled(Circle)<StatusAnimation>`
  border: 1px dashed hsla(0, 0%, 100%, 0.2);
  width: 56%;
  height: 56%;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);

  animation-name: ${({ show }) => (show ? animateCircleSmallest : "")};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;
`;
const Content = styled.p<StatusAnimation>`
  font-size: 60px;
  font-weight: 700;
  left: 50%;
  line-height: calc(72px / 60px);
  position: absolute;
  text-align: center;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;

  animation-name: ${({ show }) =>
    show ? animateFadeIn : animateSectionFadeOut};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;

  @media screen and (${({ theme }) => theme.breakpoint.lg}) {
    font-size: 55px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    font-size: 43px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    font-size: 32px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.xs}) {
    font-size: 25px;
  }
`;
export default Section2;
