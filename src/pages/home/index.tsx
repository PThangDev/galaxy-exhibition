import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import image from "src/assets/images";
import { DURATION_ANIMATION } from "src/components/Common/constants";
import Header from "src/components/Header";
import Section1 from "src/components/Section1";
import Section2 from "src/components/Section2";
import Section3 from "src/components/Section3";
import Section3Mobile from "src/components/Section3Mobile";
import styled, { keyframes } from "styled-components";
type Props = {};

type ActiveSection = "section1" | "section2" | "section3";
const HomePage = (props: Props) => {
  const [indexSection, setIndexSection] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("section1");
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);
  const [isDraggingSlide, setIsDraggingSlide] = useState(false);
  const lastScrollTop = useRef(0);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const handleScrollUp = useCallback(() => {
    if (isScrolling) return;
    if (indexSection <= 0) return;
    setIsScrollDown(false);
    setIndexSection((prevState) => prevState - 1);
    setIsScrolling(true);
  }, [indexSection, isScrolling]);
  const handleScrollDown = useCallback(() => {
    if (isScrolling) return;
    if (indexSection === 2) return;

    setIsScrollDown(true);
    setIndexSection((prevState) => prevState + 1);

    setIsScrolling(true);
  }, [indexSection, isScrolling]);

  const handleScroll = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY < 0) {
      //Scroll up
      handleScrollUp();
    } else if (e.deltaY >= 0) {
      //Scroll down
      handleScrollDown();
    }
  };

  const handleToggleScrollStatus = useCallback((status: boolean) => {
    setIsScrolling(!status);
  }, []);
  const handleDragSlide = useCallback((status: boolean) => {
    setIsDraggingSlide(status);
  }, []);

  // @ts-ignore
  const handleTouchStart = useCallback((e) => {
    if (!e.touches) return;
    lastScrollTop.current = e.touches[0].clientY;
  }, []);
  const handleTouchEnd = useCallback(
    // @ts-ignore
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

  // Side effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      switch (indexSection) {
        case 0:
          setActiveSection("section1");
          break;
        case 1:
          setActiveSection("section2");
          break;
        case 2:
          setActiveSection("section3");
          break;
      }
      setIsScrolling(false);
    }, DURATION_ANIMATION * 1000);
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [indexSection]);

  const renderSection3 = () => {
    if (!isMobile) {
      return (
        activeSection === "section3" && (
          <Section3
            show={indexSection === 2 && isScrollDown}
            reverse={indexSection === 1 && !isScrollDown}
            onToggleScroll={handleToggleScrollStatus}
            onDragSlide={handleDragSlide}
          />
        )
      );
    } else {
      return (
        activeSection === "section3" && (
          <Section3Mobile
            show={indexSection === 2 && isScrollDown}
            reverse={indexSection === 1 && !isScrollDown}
            onToggleScroll={handleToggleScrollStatus}
            onDragSlide={handleDragSlide}
          />
        )
      );
    }
  };

  return (
    <StyledHomePage>
      <Header />
      <Main
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {activeSection === "section1" && (
          <Section1
            hide={
              (indexSection === 1 && isScrollDown) ||
              (indexSection === 0 && !isScrollDown)
            }
            reverse={indexSection === 0 && !isScrollDown}
          />
        )}
        {activeSection === "section2" && (
          <Section2
            show={
              (indexSection === 1 && isScrollDown) ||
              (indexSection === 0 && !isScrollDown)
            }
            hide={
              (indexSection === 2 && isScrollDown) ||
              (indexSection === 1 && !isScrollDown)
            }
            reverse={
              (indexSection === 0 && !isScrollDown) ||
              (indexSection === 1 && !isScrollDown)
            }
          />
        )}
        {renderSection3()}
      </Main>
      {indexSection < 2 && (
        <ButtonScroll>
          <img src={image.buttonScorll} alt="btn-scroll" />
        </ButtonScroll>
      )}
    </StyledHomePage>
  );
};
const animateBtnScroll = keyframes`
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const StyledHomePage = styled.div``;
const Main = styled.main``;
const ButtonScroll = styled.div`
  bottom: 50px;
  cursor: pointer;
  left: 65px;
  position: fixed;
  z-index: 100;
  & > img {
    animation: ${animateBtnScroll} 2s infinite ease-in-out;
  }
  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    left: 50%;
    transform: translateX(-50%) translateY(0);
  }
`;
export default HomePage;
