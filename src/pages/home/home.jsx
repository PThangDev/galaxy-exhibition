import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import IconScroll from "../../assets/img/icon-scroll.png";
import Galaxy from "../../components/Galaxy";
import Intro from "../../components/Intro";
import Welcome from "../../components/Welcome";

const ANIMATION_DURATION = 1000;

const Home = () => {
  // const scrollCont = useRef<HTMLDivElement>(null);
  const [indexSection, setIndexSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [isWelcome, setIsWelcome] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const handleScroll = (e) => {
    if (e.deltaY < 0) {
      //Scroll up
      if (isScrolling) return;
      if (indexSection === 0) return;
      setIsScrollUp(true);
      setIndexSection(indexSection - 1);
      // setIsIntro(true);
      setIsScrolling(true);
    } else if (e.deltaY >= 0) {
      //Scroll down
      if (isScrolling) return;
      if (indexSection === 2) return;
      setIsScrollUp(false);
      setIndexSection(indexSection + 1);
      setIsScrolling(true);
    }
  };
  // console.log(indexSection, isScrolling);
  useEffect(() => {
    let timeoutId;
    if (indexSection === 0) {
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        setIsIntro(true);
        setIsWelcome(false);
        // setIsWelcome(true);
      }, ANIMATION_DURATION);
    }
    if (indexSection === 1) {
      if (isScrollUp) {
        timeoutId = setTimeout(() => {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(true);
        }, ANIMATION_DURATION);
      } else {
        timeoutId = setTimeout(() => {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(true);
        }, ANIMATION_DURATION);
      }
    }
    if (indexSection === 2) {
      if (isScrollUp) {
      } else {
        timeoutId = setTimeout(() => {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(false);
        }, ANIMATION_DURATION);
      }
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [indexSection, isScrollUp]);
  //Render UI
  const handleToggleScrollStatus = useCallback((status) => {
    setIsScrolling(!status);
  }, []);
  return (
    <div className="home" onWheel={handleScroll}>
      <Intro
        key={Date.now() + "intro"}
        className={classNames({
          "hide reverse": indexSection === 1 && !isScrollUp,
          "hide ": indexSection === 0 && isScrollUp,
        })}
        isIntro={isIntro}
      />
      {!isIntro && (
        <Welcome
          key={Date.now() + "welcome"}
          className={classNames({
            hide: indexSection === 2,
            show: indexSection === 1 && !isScrollUp,
            "hide reverse": indexSection === 1 && isScrollUp,
            "show reverse": indexSection === 0 && isScrollUp,
          })}
          isWelcome={isWelcome}
        />
      )}
      {!isWelcome && !isIntro && (
        <Galaxy
          className={classNames({
            hide: indexSection === 1 && isScrollUp,
            show: indexSection === 2 && !isScrollUp,
          })}
          isGalaxy={!isWelcome || !isIntro}
          onToggleScroll={handleToggleScrollStatus}
        />
      )}
      <div className="button-scroll">
        <img src={IconScroll} alt="" className="button-scroll-image" />
      </div>
    </div>
  );
};
export default Home;
