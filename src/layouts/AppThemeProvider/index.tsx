import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

interface Props {
  children: React.ReactNode;
}

export enum BreakPoint {
  XS = "480px",
  SM = "576px",
  MD = "768px",
  LG = "992px",
  XL = "1200px",
  XXL = "1400px",
}
interface Breakpoint {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}
interface ThemeProps {
  textColor: string;
  headerHeight: string;
  breakpoint: Breakpoint;
}
const theme: ThemeProps = {
  textColor: "#fff",
  headerHeight: "120px",
  breakpoint: {
    xs: "max-width: 400px",
    sm: "max-width: 576px",
    md: "max-width: 768px",
    lg: "max-width: 992px",
    xl: "max-width: 1200px",
    xxl: "max-width: 1400px",
  },
};
const AppThemeProvider: FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default AppThemeProvider;
