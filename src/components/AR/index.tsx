import React, { FC } from "react";
import image from "src/assets/images";
import {
  ButtonClose,
  ButtonPrimary,
} from "src/components/Common/StyledComponent/Button";
import styled from "styled-components";
interface Props {
  primary?: boolean;
  onChangeModal?: () => void;
  onCloseModal?: () => void;
}

const AR: FC<Props> = ({ onChangeModal, onCloseModal, primary = true }) => {
  const handleContinue = () => {
    if (onChangeModal) {
      onChangeModal();
    }
  };
  const renderButton = () => {
    if (primary) {
      return <ButtonContinue onClick={handleContinue}>Continue</ButtonContinue>;
    } else {
      return <ButtonExit onClick={onCloseModal}>Close</ButtonExit>;
    }
  };
  return (
    <StyledAR>
      <ButtonClose onClick={onCloseModal}>
        <img src={image.iconClose} alt="" />
      </ButtonClose>
      <Container primary={primary}>
        <Content>
          <Heading>AR INSTRUCTIONS</Heading>
          <Title>
            This poster includes optional Augmented Reality features. Using a
            phone or tablet, you can experience this poster as it comes to life,
            including animation and sound.
          </Title>
          <QR>
            <QRSocial>
              <img src={image.qrFacebook} alt="" />
              <QRInfo>
                <img src={image.iconFacebook} alt="" />
                Facebook
              </QRInfo>
            </QRSocial>
            <QRSocial>
              <img src={image.qrInstagram} alt="" />
              <QRInfo>
                <img src={image.iconInstagram} alt="" />
                Instagram
              </QRInfo>
            </QRSocial>
          </QR>
          <Guide>
            <GuideItem>
              <span>1</span>
              <p>Use the camera on your phone or tablet to scan the QR Code.</p>
            </GuideItem>
            <GuideItem>
              <span>2</span>
              <p>
                Choose either Facebook or Instagram to continue with the
                experience. You will need the latest version on your device.
              </p>
            </GuideItem>
            <GuideItem>
              <span>3</span>
              <p>
                Press the Continue button below, and then use the camera on your
                device to look at the poster on the screen.
              </p>
            </GuideItem>
          </Guide>
        </Content>
        {renderButton()}
      </Container>
    </StyledAR>
  );
};
interface StyledProps {
  primary: boolean;
}
const StyledAR = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  width: 455px;
`;
const Container = styled.div<StyledProps>`
  width: ${(props) => (props.primary ? "575px" : "unset")};
  background: ${(props) => (props.primary ? "inherit" : "#0f1b3a")};
  padding: ${(props) => (props.primary ? "0" : "58px 120px 40px 125px")};
  border-radius: ${(props) => (props.primary ? "0" : "0 50px")};
`;
const Heading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
`;
const Title = styled.div`
  margin-bottom: 23px;
  font-weight: bold;
`;
const QR = styled.div`
  display: flex;
  align-items: center;
`;
const QRSocial = styled.div`
  margin-bottom: 17px;
  &:first-child {
    margin-right: 23px;
  }
  & > img {
    background-color: #082157;
    width: 173px;
    height: 173px;
  }
`;
const QRInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 7px 0;
  & > img {
    margin-right: 10px;
  }
`;
const Guide = styled.div``;
const GuideItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 11px;
  & > span {
    width: 24px;
    height: 24px;
    margin-right: 11px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    background: #082157;
    flex-shrink: 0;
  }
`;
const ButtonContinue = styled(ButtonPrimary)`
  float: right;
`;
const ButtonExit = styled(ButtonContinue)`
  color: black;
  background-color: #ffc918;
`;
export default AR;
