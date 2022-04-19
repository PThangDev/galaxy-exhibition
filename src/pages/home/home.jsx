import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import IconScroll from "../../assets/img/icon-scroll.png";
import Galaxy from "../../components/Galaxy";
import Intro from "../../components/Intro";
import Welcome from "../../components/Welcome";

const ANIMATION_DURATION = 1200;

const Home = () => {
  // const scrollCont = useRef<HTMLDivElement>(null);
  const [indexSection, setIndexSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [isWelcome, setIsWelcome] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isDraggingSlide, setIsDraggingSlide] = useState(false);
  const lastScrollTop = useRef(0);
  const handleScrollUp = useCallback(() => {
    if (isScrolling) return;
    if (indexSection === 0) return;

    setIsScrollUp(true);
    setIndexSection(indexSection - 1);
    setIsScrolling(true);
  }, [indexSection, isScrolling]);
  const handleScrollDown = useCallback(() => {
    if (isScrolling) return;
    if (indexSection === 2) return;

    setIsScrollUp(false);
    setIndexSection(indexSection + 1);
    setIsScrolling(true);
  }, [indexSection, isScrolling]);
  const handleScroll = (e) => {
    if (e.deltaY < 0) {
      //Scroll up
      handleScrollUp();
    } else if (e.deltaY >= 0) {
      //Scroll down
      handleScrollDown();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (indexSection === 0) {
        setIsScrolling(false);
        setIsIntro(true);
        setIsWelcome(false);
      }
      if (indexSection === 1) {
        if (isScrollUp) {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(true);
        } else {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(true);
        }
      }
      if (indexSection === 2) {
        if (isScrollUp) {
        } else {
          setIsIntro(false);
          setIsScrolling(false);
          setIsWelcome(false);
        }
      }
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [indexSection, isScrollUp]);
  //Render UI
  const handleToggleScrollStatus = useCallback((status) => {
    setIsScrolling(!status);
  }, []);
  const handleTouchStart = useCallback((e) => {
    if (!e.touches) return;
    lastScrollTop.current = e.touches[0].clientY;
  }, []);
  const handleTouchEnd = useCallback(
    (e) => {
      if (!e.changedTouches) return;
      if (isDraggingSlide) return;
      const clientY = e.changedTouches[0].clientY;
      if (lastScrollTop.current > clientY + 5) {
        handleScrollDown();
      } else if (lastScrollTop.current < clientY - 5) {
        //Scroll up
        handleScrollUp();
      }
    },
    [handleScrollDown, handleScrollUp, isDraggingSlide]
  );
  // useEffect(() => {
  //   window.addEventListener("touchstart", handleTouchStart);
  //   window.addEventListener("touchend", handleTouchEnd);
  //   return () => {
  //     window.removeEventListener("touchstart", handleTouchStart, null);
  //     window.removeEventListener("touchend", handleTouchEnd, null);
  //   };
  // }, [handleTouchEnd, handleTouchStart]);
  const onDragSlide = useCallback((status) => {
    // console.log("drag");
    setIsDraggingSlide(status);
  }, []);
  return (
    <div
      className="home"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll}
    >
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
          onDragSlide={onDragSlide}
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
