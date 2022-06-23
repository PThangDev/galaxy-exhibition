import React from "react";
import image from "src/assets/images";
import { BreakPoint } from "src/layouts/AppThemeProvider";
import styled from "styled-components";
import { Button } from "../Common/StyledComponent/Button";

type Props = {};

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <img src={image.logo} alt="" />
      <ButtonAirDrop>Join Airdrop</ButtonAirDrop>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 80px;
  height: ${(props) => props.theme.headerHeight};
  z-index: 100;
  flex-wrap: nowrap;

  img {
    width: 125px;
    object-fit: cover;
    @media screen and (${({ theme }) => theme.breakpoint.sm}) {
      width: 90px;
    }
  }

  // breakpoint
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    height: 80px;
  }

  @media screen and (${({ theme }) => theme.breakpoint.lg}) {
    padding: 0 50px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    padding: 0 30px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    padding: 0 10px;
  }
`;
const ButtonAirDrop = styled(Button)`
  transition: all 0.5s;
  width: 228px;
  padding: 10px 0;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  background: url(${image.bgButtonHeader}) no-repeat, rgba(255, 255, 255, 0.2);
  background-size: 100% 100%;
  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    font-size: 20px;
    width: 200px;
  }
  @media screen and (${({ theme }) => theme.breakpoint.sm}) {
    font-size: 15px;
    width: 120px;
    min-width: unset;
  }
`;
export default Header;
