import React from "react";
import IconClose from "../assets/img/ar/icon-close.svg";
import IconInfo from "../assets/img/ar/icon-info.svg";
const InfoScan = ({ ship, onCloseModal }) => {
  const handleCloseModal = () => {
    onCloseModal();
  };
  return (
    <div className="info-scan">
      <p className="icon-box" onClick={handleCloseModal}>
        <img src={IconClose} alt="" className="icon icon--close" />
      </p>
      <div className="info-scan-container ar-container--full">
        <h3 className="info-scan__heading ar__heading--primary">
          <img src={IconInfo} alt="" className="info-scan__heading-icon" />
          AR INSTRUCTIONS
        </h3>
        <div className="info-scan-image">
          <img
            src={require(`../assets/img/${ship.image}`)}
            alt=""
            className="info-scan-image__img"
          />
          <p className="info-scan-line"></p>
          <p className="info-scan-image__sub">Scan me</p>
        </div>
      </div>
    </div>
  );
};

export default InfoScan;
