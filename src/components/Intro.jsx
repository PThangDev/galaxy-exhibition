import React from "react";
import logo from "../assets/img/logo.png";
import line from "../assets/img/line.png";
import classNames from "classnames";
import LineMobile from "../assets/img/line-svg-mobile.svg";

const Intro = ({ className, isIntro }) => {
  if (!isIntro) return null;
  return (
    <section
      className={classNames("section intro", { [className]: className })}
    >
      <img src={logo} alt="" className="intro-logo" />
      <img src={line} className="intro-line" alt="" />
      <p className="intro-title">
        The Great Galatic <span></span> War on Avalanche
      </p>
      {/* <img src={LineMobile} alt="" /> */}
    </section>
  );
};

export default Intro;
