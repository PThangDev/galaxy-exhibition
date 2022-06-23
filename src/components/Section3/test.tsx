import gsap from "gsap";
import {
  CSSRulePlugin,
  CustomEase,
  Draggable,
  MotionPathPlugin,
} from "gsap/all";
import React, {
  createRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import galaxy from "src/assets/galaxy.json";
import image from "src/assets/images";
import styled from "styled-components";
type Props = {};

gsap.registerPlugin(MotionPathPlugin, CSSRulePlugin, CustomEase, Draggable);

const SPEED = 25;
const dragDistancePerRotation = 2000;
const Section3 = (props: Props) => {
  const [filter, setFilter] = useState<string>("lachesis");
  // MutableRefObject
  const [slideItemRef, setSlideItemRef] = useState<
    MutableRefObject<HTMLDivElement>[]
  >([]);
  const ellipseRef = useRef<HTMLImageElement>(null);

  const gsapEllipseRef = gsap.utils.selector(ellipseRef);

  useEffect(() => {
    setSlideItemRef((elRefs) =>
      [1, 2, 3, 4, 5].map((_, i) => elRefs[i] || createRef())
    );
  }, []);

  useEffect(() => {
    MotionPathPlugin.convertToPath("path");
    let proxy = document.createElement("div"),
      progressWrap = gsap.utils.wrap(0, 1),
      startProgress = [];
    const gsapElements = [];
    if (!slideItemRef.length) return;
    slideItemRef.forEach((ele, index) => {
      const gsapElement = gsap
        .to(ele, {
          duration: SPEED,
          motionPath: {
            path: "#path",
            align: gsapEllipseRef("#path")[0],
            alignOrigin: [0.5, 0.5],
            // fromCurrent: true,
          },
          transformOrigin: "50% 50%",
          repeat: -1,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.15,0.18333 0.27,0.36 0.45,0.55 0.63333,0.7 0.81667,0.85 1,1 "
          ),
          keyframes: {
            "0%": { scale: 0.75, zIndex: 3 },
            "15%": { zIndex: 4 },
            "25%": { scale: 1 },
            "40%": { zIndex: 3 },
            "50%": { scale: 0.75, zIndex: 2 },
            "60%": { scale: 0.5, zIndex: 1 },
            "88%": { scale: 0.4, zIndex: 1 },
            "100%": { scale: 0.75, zIndex: 2 },
          },
        })
        .progress(index / slideItemRef.length);
      // gsapElement.pause();
      gsapElements.push(gsapElement);
      console.log(gsapElement);
    });
    // Draggable.create(proxy, {
    //   trigger: ".slide",
    //   type: "x", // we only care about movement on the x-axis.
    //   inertia: true,
    //   allowNativeTouchScrolling: true,
    //   onPress() {
    //     startProgress = [];
    //     gsap.killTweensOf(gsapElements); // if it's in the middle of animating the spin back to timeScale: 1, kill that.
    //     gsapElements.map((ele) => {
    //       ele.timeScale(0);
    //       startProgress.push(ele.progress());
    //     });
    //   },
    //   onDrag: updateRotation,
    //   onThrowUpdate: updateRotation,
    //   onRelease() {
    //     // timeoutRef.current = setTimeout(() => {
    //     //   if (typeof onDragSlide === "function") {
    //     //     onDragSlide(false);
    //     //   }
    //     // }, 500);
    //     if (!this.tween || !this.tween.isActive()) {
    //       gsap.to(gsapElements, { timeScale: 1, duration: 1 });
    //     }
    //   },
    //   onThrowComplete() {
    //     gsap.to(gsapElements, { timeScale: 1, duration: 1 });
    //   },
    // });
    // function updateRotation() {
    //   // if (typeof onDragSlide === "function") {
    //   //   onDragSlide(true);
    //   // }
    //   gsapElements.map((ele, index) => {
    //     let p =
    //       startProgress[index] +
    //       (this.startX - this.x) / dragDistancePerRotation;
    //     ele.progress(progressWrap(p));
    //   });
    // }
  }, [gsapEllipseRef, slideItemRef]);
  // you can access the elements with itemsRef.current[n]
  console.log(slideItemRef);
  // const slideItemRef = useRef();
  // const [slideItemEleRef, setSlideItemEleRef] = useState();
  return (
    <StyledSection3>
      <Slider>
        {galaxy
          .filter(
            (item) => item.tribe.name.toLowerCase() === filter.toLowerCase()
          )
          .map((item, index) => (
            <SlideItem
              key={index}
              ref={slideItemRef[index]}
              // ref={(el) => (itemsRef.current[index] = el)}
            ></SlideItem>
          ))}

        <img src={image.ellipse} alt="" ref={ellipseRef} />
      </Slider>

      <TribeList>
        <TribeItem>
          <img
            src={
              require(`src/assets/images/tribe/icon-tribe-atropos.svg`).default
            }
            alt=""
          />
        </TribeItem>
        <TribeItem>
          <img
            src={
              require(`src/assets/images/tribe/icon-tribe-atropos.svg`).default
            }
            alt=""
          />
        </TribeItem>
        <TribeItem>
          <img
            src={
              require(`src/assets/images/tribe/icon-tribe-atropos.svg`).default
            }
            alt=""
          />
        </TribeItem>
      </TribeList>
    </StyledSection3>
  );
};
const StyledSection3 = styled.section`
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;
const SlideItem = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  overflow: visible;
  cursor: pointer;
  top: 0;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 5px solid #60eaf1;
    display: block;
    top: 0;
    left: 0;
    transform: rotate(45deg);
  }
`;
const SlideInfo = styled.div``;
const Slider = styled.div`
  position: relative;
  width: 907px;
  height: 104px;
`;

const TribeList = styled.ul`
  bottom: 75px;
  justify-content: flex-start;
  padding-top: 50px;
  position: absolute;
  right: 100px;
  background: url(${image.tribeLine}) no-repeat top center;

  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const TribeItem = styled.li`
  list-style: none;
  background-color: hsla(0, 0%, 100%, 0.5);
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
  & > img {
    transform: rotate(-45deg);
  }
`;
export default Section3;
