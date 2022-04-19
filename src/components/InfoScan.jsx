import React, { useState } from "react";
import IconClose from "../assets/img/ar/icon-close.svg";
import IconInfo from "../assets/img/ar/icon-info.svg";
import Modal from "react-modal";
import AR from "./AR";
const InfoScan = ({ ship, onCloseModal }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseParentModal = () => {
    onCloseModal();
  };
  const handleCloseCurrentModal = () => {
    setIsOpenModal(false);
  };
  const handleShowModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModal}
        className="modal-info-scan-sub"
        overlayClassName="overlay-info-scan-sub"
      >
        <AR primary={false} onCloseModal={handleCloseCurrentModal} />
      </Modal>
      <div className="info-scan">
        <p className="icon-box" onClick={handleCloseParentModal}>
          <img src={IconClose} alt="" className="icon icon--close" />
        </p>
        <div className="info-scan-container ar-container--full">
          <h3
            className="info-scan__heading ar__heading--primary"
            onClick={handleShowModal}
          >
            <img src={IconInfo} alt="" className="info-scan__heading-icon" />
            AR INSTRUCTIONS
          </h3>
          <div className="info-scan-image">
            <img
              src={require(`../assets/img/${ship.image}`)}
              alt=""
              className="info-scan-image__img"
            />
            <div className="info-scan-image__sub">
              <p></p>
              <span>Scan me</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoScan;
