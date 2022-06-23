import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
   margin: 0;
   padding: 0;
   box-sizing : border-box ;
  }
  body {
    background: linear-gradient(253.28deg,#052365 .64%,#141522 61.26%);
    color: #fff;
    height: 100vh;
    overflow: hidden!important;
    width: 100vw;
}
`;

export default GlobalStyles;
