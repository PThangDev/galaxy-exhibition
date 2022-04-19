import React, { useState } from "react";
import IconClose from "../assets/img/ar/icon-close.svg";
import IconFacebook from "../assets/img/ar/icon-facebook.svg";
import IconInstagram from "../assets/img/ar/icon-instagram.svg";
import QRFacebook from "../assets/img/ar/qr-facebook.png";
import QRInstagram from "../assets/img/ar/qr-instagram.png";
import Modal from "react-modal";
import InfoScan from "./InfoScan";
import classNames from "classnames";

const AR = ({
  onCloseModal,
  onChangeModal,
  className = "",
  primary = true,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleShowModal = () => {
    // setIsOpenModal();
    onChangeModal();
  };
  const renderButton = () => {
    if (primary) {
      return (
        <button
          className="button button--primary ar-button"
          onClick={handleShowModal}
        >
          Continue
        </button>
      );
    } else {
      return (
        <button
          className="button button--primary ar-button ar-button--close"
          onClick={handleCloseModal}
        >
          Close
        </button>
      );
    }
  };
  return (
    <>
      <Modal isOpen={isOpenModal} className="Modal" overlayClassName="Overlay">
        <InfoScan />
      </Modal>
      <div className={classNames("ar", { "ar--sub": !primary })}>
        <p className="icon-box" onClick={handleCloseModal}>
          <img src={IconClose} alt="" className="icon icon--close" />
        </p>
        <div className="ar-container">
          <div className="ar-content">
            <h3 className="ar__heading">AR INSTRUCTIONS</h3>
            <p className="ar__title">
              This poster includes optional Augmented Reality features. Using a
              phone or tablet, you can experience this poster as it comes to
              life, including animation and sound.
            </p>
            <div className="ar-qr">
              <div className="ar-qr-item">
                <div className="ar-qr-item-image">
                  <img src={QRFacebook} alt="qr-facebook" />
                </div>
                <div className="ar-qr-item-info">
                  <img
                    src={IconFacebook}
                    alt=""
                    className="qr-icon qr-icon--facebook"
                  />
                  Facebook
                </div>
              </div>
              <div className="ar-qr-item">
                <div className="ar-qr-item-image">
                  <img
                    className="qr-icon qr-icon--instagram"
                    src={QRInstagram}
                    alt="qr-instagram"
                  />
                </div>
                <div className="ar-qr-item-info">
                  <img
                    src={IconInstagram}
                    alt=""
                    className="qr-icon qr-icon--facebook"
                  />
                  Instagram
                </div>
              </div>
            </div>
            <ul className="ar-note">
              <li className="ar-note-item">
                <span className="ar-note-number">1</span>
                <p className="ar-note-text">
                  Use the camera on your phone or tablet to scan the QR Code.
                </p>
              </li>
              <li className="ar-note-item">
                <span className="ar-note-number">2</span>
                <p className="ar-note-text">
                  Choose either Facebook or Instagram to continue with the
                  experience. You will need the latest version on your device.
                </p>
              </li>
              <li className="ar-note-item">
                <span className="ar-note-number">3</span>
                <p className="ar-note-text">
                  Press the Continue button below, and then use the camera on
                  your device to look at the poster on the screen.
                </p>
              </li>
            </ul>
          </div>
          <div className="ar-button">{renderButton()}</div>
        </div>
      </div>
    </>
  );
};

export default AR;
