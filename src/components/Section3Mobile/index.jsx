import gsap from "gsap";
import {
  CSSRulePlugin,
  CustomEase,
  Draggable,
  MotionPathPlugin,
} from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import galaxy from "src/assets/galaxy.json";
import { ReactComponent as Ellipse } from "src/assets/images/ellipse-straight.svg";
import pointer from "src/assets/images/pointer.svg";
import tribeLine from "src/assets/images/tribe-line.png";
import tribes from "src/assets/tribe.json";
import styled, { keyframes } from "styled-components";
import AR from "../AR";
import ARInfo from "../ARInfo";
import { DURATION_ANIMATION } from "../Common/constants";
gsap.registerPlugin(MotionPathPlugin, CSSRulePlugin, CustomEase, Draggable);

const Section3Mobile = ({
  show = false,
  reverse = false,
  onDragSlide,
  onToggleScroll,
}) => {
  const [filter, setFilter] = useState("lachesis");
  const [ship, setShip] = useState();

  const ellipseRef = useRef(null);
  const timeoutRef = useRef(null);

  const refs = [];
  const [elements, ref] = [refs, (el) => el && refs.push(el)];

  // Logic animation ship
  const SPEED = 25;
  const dragDistancePerRotation = 2000;
  const gsapEllipseRef = gsap.utils.selector(ellipseRef);
  const gsapElementRef = useRef([]);
  const [isAnimation, setIsAnimation] = useState(true);
  useEffect(() => {
    MotionPathPlugin.convertToPath("path");
    let proxy = document.createElement("div"),
      progressWrap = gsap.utils.wrap(0, 1),
      startProgress;

    const rotate = [];
    elements.forEach((ele, index) => {
      const gsapElement = gsap
        .to(ele, {
          duration: SPEED,
          motionPath: {
            path: gsapEllipseRef("#path")[0],
            align: gsapEllipseRef("#path")[0],
            alignOrigin: [0.5, 0.5],
            fromCurrent: true,
          },
          transformOrigin: "50% 50%",
          repeat: -1,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.15,0.18333 0.3,0.36667 0.44,0.56 0.63333,0.7 0.81667,0.85 1,1"
          ),
          keyframes: {
            "0%": { scale: 0.6, zIndex: 3, opacity: 1 },
            "20%": { scale: 1, zIndex: 5, opacity: 1 },
            "40%": { scale: 0.6, zIndex: 3, opacity: 1 },
            "55%": {
              scale: 0.4,
              zIndex: 1,
              opacity: 1,
            },
            "65%": {
              scale: 0.2,
              zIndex: 1,
              opacity: 0.3,
            },
            "90%": {
              scale: 0.1,
              zIndex: 1,
              opacity: 0.8,
            },
            "100%": { scale: 0.6, zIndex: 4, opacity: 1 },
          },
        })
        .progress(index / elements.length);
      if (!isAnimation) {
        gsapElement.pause();
      }
      rotate.push(gsapElement);
    });
    gsapElementRef.current = rotate;
    Draggable.create(proxy, {
      trigger: ".slide",
      type: "y", // we only care about movement on the x-axis.
      inertia: true,
      allowNativeTouchScrolling: true,
      onPress() {
        startProgress = [];
        gsap.killTweensOf(rotate); // if it's in the middle of animating the spin back to timeScale: 1, kill that.
        rotate.map((ele) => {
          ele.timeScale(0);
          startProgress.push(ele.progress());
        });
      },
      onDrag: updateRotation,
      onThrowUpdate: updateRotation,
      onRelease() {
        timeoutRef.current = setTimeout(() => {
          if (typeof onDragSlide === "function") {
            onDragSlide(false);
          }
        }, 500);
        if (!this.tween || !this.tween.isActive()) {
          gsap.to(rotate, { timeScale: 1, duration: 1 });
        }
      },
      onThrowComplete() {
        gsap.to(rotate, { timeScale: 1, duration: 1 });
      },
    });

    function updateRotation() {
      if (typeof onDragSlide === "function") {
        onDragSlide(true);
      }
      rotate.map((ele, index) => {
        let p =
          startProgress[index] +
          (-this.startY + this.y) / dragDistancePerRotation;
        ele.progress(progressWrap(p));
      });
    }
  }, [elements, gsapEllipseRef, isAnimation]);

  const handleChangeTribe = (tribeName) => {
    setFilter(tribeName);
  };

  const [isOpenModalAR, setIsOpenModalAr] = useState(false);
  const [activeModal, setActiveModal] = useState("ar");
  const handleShowModalAR = (ship) => {
    setIsOpenModalAr(true);
    setShip(ship);
  };
  const handleCloseModalAR = () => {
    setIsOpenModalAr(false);
  };
  const handleChangeModal = () => {
    setActiveModal((prevState) => {
      return prevState === "arInfo" ? "ar" : "arInfo";
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
            background:
              "linear-gradient(253.28deg, #052365 0.64%, #141522 61.26%)",
          },

          overlay: { zIndex: 200, outline: "none", border: "none" },
        }}
        isOpen={isOpenModalAR}
        // className="Modal"
        // overlayClassName="Overlay"
        // shouldCloseOnOverlayClick={true}
      >
        {activeModal === "ar" ? (
          <AR
            onChangeModal={handleChangeModal}
            onCloseModal={handleCloseModalAR}
          />
        ) : (
          <ARInfo
            ship={ship}
            onChangeModal={handleChangeModal}
            onCloseModal={handleCloseModalAR}
          />
        )}
      </Modal>
      <StyledSection3Mobile key={Date.now() + "galaxy"}>
        <Slider ref={ellipseRef} show={show} reverse={reverse}>
          {galaxy
            .filter(
              (item) => item.tribe.name.toLowerCase() === filter.toLowerCase()
            )
            .map((item, index) => (
              <SlideItem
                key={index}
                ref={ref}
                className="slide"
                onClick={() => handleShowModalAR(item)}
                // ref={(el) => (itemsRef.current[index] = el)}
              >
                <SlideContent>
                  <img
                    src={require(`src/assets/images/${item.image}`)}
                    alt={index}
                  />
                  <Pointer></Pointer>
                  <Slidebox>
                    <SlideInfo>
                      <img src={pointer} alt="" />
                      {/* <PointerImg src={pointer} alt="" /> */}
                      <SlideInfoHeader>
                        <img
                          src={require(`src/assets/images/${item.tribe.image}`)}
                          alt=""
                        />
                        {item.tribe.name}
                      </SlideInfoHeader>
                      <SlideInfoText>
                        <p>{item.name}</p>
                        <p>Type Ship: GOD</p>
                      </SlideInfoText>
                    </SlideInfo>
                  </Slidebox>
                </SlideContent>
              </SlideItem>
            ))}
          <Ellipse />
        </Slider>
        <TribeList>
          {tribes.map((tribe) => (
            <TribeItem
              key={tribe.name}
              onClick={() => handleChangeTribe(tribe.name)}
              className={filter === tribe.name ? "active" : ""}
            >
              <img src={require(`src/assets/images/${tribe.image}`)} alt="" />
            </TribeItem>
          ))}
        </TribeList>
      </StyledSection3Mobile>
    </>
  );
};
const animateBoxZoomShow = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
`;
const StyledSection3Mobile = styled.section`
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;
const Slider = styled.div`
  position: relative;
  /* width: 907px;
  height: 104px; */

  animation-name: ${animateBoxZoomShow};
  animation-duration: ${DURATION_ANIMATION}s;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "forwards")};
  animation-timing-function: ease-in-out;
`;

const SlideItem = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  overflow: visible;
  cursor: pointer;
  box-sizing: border-box;
  top: 0;
  &::after {
    content: "";
    position: absolute;
    /* width: 10px;
    height: 10px;
    background: #ffffff;
    border: 5px solid #60eaf1;
    display: block;
    top: 0;
    left: 0;
    transform: rotate(45deg);
    z-index: 1; */
  }
`;

const TribeList = styled.ul`
  bottom: 75px;
  justify-content: flex-start;
  padding-top: 50px;
  position: absolute;
  right: 100px;
  background: url(${tribeLine}) no-repeat top center;

  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media screen and (${({ theme }) => theme.breakpoint.md}) {
    right: 50%;
    transform: translateX(50%);
  }
`;
const TribeItem = styled.li`
  list-style: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  height: 50px;
  justify-content: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  &.active {
    background-color: hsla(0, 0%, 100%, 0.5);
  }
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.3);
  }
  & > img {
    transform: rotate(-45deg);
  }
`;
const SlideContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  /* top: 100%; */
  bottom: calc(100% + 10px);
  & > img {
    width: 628px;
    height: 354px;

    @media screen and (${({ theme }) => theme.breakpoint.md}) {
      width: 90vw;
      height: 270px;
    }
    @media screen and (${({ theme }) => theme.breakpoint.md}) {
      width: 90vw;
    }
  }
`;
const Slidebox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const SlideInfo = styled.div`
  font-weight: bold;
  position: relative;
  & > img {
    position: absolute;
    left: calc(-100% - 40px);
    transform: translateY(-50%);
    @media screen and (${({ theme }) => theme.breakpoint.md}) {
      left: calc(-100px);
      width: 90px;
    }
  }
`;
const Pointer = styled.div``;
const SlideInfoHeader = styled.h3`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > img {
    margin-right: 5px;
  }
`;
const SlideInfoText = styled.div``;
export default React.memo(Section3Mobile);
