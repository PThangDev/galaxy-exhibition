import React, { FC } from "react";
import image from "src/assets/images";
import styled, { keyframes } from "styled-components";
import { DURATION_ANIMATION } from "../Common/constants";
type Props = {
  hide?: boolean;
  show?: boolean;
  reverse: boolean;
};

const Section1: FC<Props> = ({ hide = false, reverse = false }) => {
  return (
    <StyledSection1 hide={hide} reverse={reverse} key={Date.now()}>
      <Container>
        <Logo>
          <img src={image.logo} alt="" />
        </Logo>
        <Line>
          <img src={image.bgLineSection1} alt="" />
        </Line>
        <Title>The Great Galatic War on Avalanche</Title>
      </Container>
    </StyledSection1>
  );
};

export const animateSectionFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledSection1 = styled.section<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});

  animation-name: ${({ hide }) => (hide ? animateSectionFadeOut : "")};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
`;
const Logo = styled.div`
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    width: 200px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.xs}) {
    width: 170px;
  }
  & > img {
    max-width: 100%;
  }
`;
const Line = styled.div`
  padding: 35px 0;
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    padding: 15px 0;
  }
  & > img {
    width: 100%;
  }
`;
const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export default Section1;
