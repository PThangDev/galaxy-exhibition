import classNames from "classnames";
import React from "react";
import Square from "../assets/img/welcome/square.png";

const Welcome = ({ className, isWelcome = false }) => {
  if (!isWelcome) return null;
  return (
    <section
      className={classNames("section welcome", { [className]: className })}
    >
      <div className="welcome-box">
        <div className="welcome-square welcome-square--largest">
          <img className="square-child square-child--top" src={Square} alt="" />
          <img
            className="square-child square-child--bottom"
            src={Square}
            alt=""
          />
        </div>
        <div className="welcome-square welcome-square--smaller">
          <img
            className="square-child square-child--top square-child--smaller"
            src={Square}
            alt=""
          />
          <img
            className="square-child square-child--bottom square-child--smaller"
            src={Square}
            alt=""
          />
        </div>
        <div className="welcome-square welcome-square--smallest">
          <img
            className="square-child square-child--top square-child--smallest"
            src={Square}
            alt=""
          />
          <img
            className="square-child square-child--bottom square-child--smallest"
            src={Square}
            alt=""
          />
        </div>
      </div>
      <p className="welcome-content">
        Welcome to <br />
        AR Galactic Exhibition
      </p>
    </section>
  );
};

export default Welcome;
