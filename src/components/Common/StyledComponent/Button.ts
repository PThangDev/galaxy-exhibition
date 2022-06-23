import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  color: #fff;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  min-height: 46px;
`;

export const ButtonRounded = styled(Button)`
  border-radius: 10px;
`;

export const ButtonPrimary = styled(Button)`
  border-radius: 10px;
  background: #082157;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ButtonClose = styled.div`
  align-items: center;
  background: hsla(0, 0%, 100%, 0.2);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 43px;
  justify-content: center;
  position: absolute;
  right: 30px;
  top: 30px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  width: 43px;
  & > img {
    transform: rotate(-135deg);
  }
`;
