import React, { FC, useState } from "react";
import image from "src/assets/images";
import styled from "styled-components";
import { ButtonClose } from "../Common/StyledComponent/Button";
import Modal from "react-modal";
import AR from "../AR";
interface Props {
  ship: { image: string; name: string; tribe: {} };
  onChangeModal: () => void;
  onCloseModal: () => void;
}

const ARInfo: FC<Props> = ({ ship, onChangeModal, onCloseModal }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // console.log(ship);

  const handleShowModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        ariaHideApp={false}
        // style={customStyled}
        style={{
          content: {
            width: "100%",
            padding: "0",
            inset: 0,
            outline: "none",
            border: "none",
            background: "rgba(15, 27, 58 ,0.2)",
          },

          overlay: {
            zIndex: 200,
            outline: "none",
            border: "none",
            background: "none",
          },
        }}
        isOpen={isOpenModal}
        // className="Modal"
        // overlayClassName="Overlay"
        // shouldCloseOnOverlayClick={true}
      >
        <AR primary={false} onCloseModal={handleCloseModal} />
      </Modal>
      <StyledARInfo>
        <ButtonClose onClick={onCloseModal}>
          <img src={image.iconClose} alt="" />
        </ButtonClose>
        <Container>
          <Heading>
            <img src={image.iconInfo} alt="" />
            <p>AR INSTRUCTIONS</p>
          </Heading>
          <Image
            src={require(`src/assets/images/${ship.image}`)}
            onClick={handleShowModal}
          />

          <Description>
            <Line></Line>
            <span>Scan me</span>
          </Description>
        </Container>
      </StyledARInfo>
    </>
  );
};
const StyledARInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  & > img {
    margin-right: 10px;
  }
`;
const Image = styled.img`
  max-width: 1060px;
  cursor: pointer;
  @media screen and (${({ theme }) => theme.breakpoint.lg}) {
    max-width: 90%;
  }
`;
const Line = styled.div`
  background-color: hsla(0, 0%, 100%, 0.5);
  height: 75px;
  position: relative;
  width: 1px;
  z-index: 1;
  &::after {
    background: #fff;
    background: #ebe9e9;
    content: "";
    display: block;
    height: 8px;
    left: 50%;
    position: absolute;
    top: 100%;
    -webkit-transform: translateX(-50%) rotate(45deg);
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span {
    margin-top: 16px;
  }
`;
export default ARInfo;
