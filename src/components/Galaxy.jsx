import classNames from "classnames";
import gsap from "gsap";
import {
  CSSRulePlugin,
  CustomEase,
  Draggable,
  MotionPathPlugin,
} from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { ReactComponent as Elipse } from "../assets/img/Ellipse.svg";
import IconLine from "../assets/img/galaxy/icon-line.svg";
import useArrayRef from "../hooks/useArrayRef";
import AR from "./AR";
import InfoScan from "./InfoScan";
import galaxyData from "../assets/galaxy.json";

gsap.registerPlugin(MotionPathPlugin, CSSRulePlugin, CustomEase, Draggable);

const SPEED = 25;
const dragDistancePerRotation = 2000;
const Galaxy = ({ className, isGalaxy, onToggleScroll, onDragSlide }) => {
  const ellipseRef = useRef(null);
  const [tribe] = useState([
    {
      id: 1,
      name: "lachesis",
      image: "tribe/icon-tribe-lachesis.svg",
    },
    {
      id: 2,
      name: "morta",
      image: "tribe/icon-tribe-morta.svg",
    },
    {
      id: 3,
      name: "atropos",
      image: "tribe/icon-tribe-atropos.svg",
    },
  ]);
  const [data] = useState(galaxyData);
  const [filter, setFilter] = useState("lachesis");
  const [ship, setShip] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const gsapElementRef = useRef([]);

  const DeepRef = gsap.utils.selector(ellipseRef);
  const [elements, ref] = useArrayRef(null);
  const galaxyRef = useRef(null);
  useEffect(() => {
    if (isOpenModal) {
      onToggleScroll(false);
    }
  }, [isOpenModal]);
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
            path: DeepRef("#path")[0],
            align: DeepRef("#path")[0],
            alignOrigin: [0.5, 0.5],
            fromCurrent: true,
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
        .progress(index / elements.length);
      // gsapElement.pause();
      rotate.push(gsapElement);
    });
    gsapElementRef.current = rotate;
    Draggable.create(proxy, {
      trigger: ".slide",
      type: "x", // we only care about movement on the x-axis.
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
        setTimeout(() => {
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
          (this.startX - this.x) / dragDistancePerRotation;
        ele.progress(progressWrap(p));
      });
    }
  }, [DeepRef, elements, filter]);

  useEffect(() => {
    if (className === "hide") {
      gsapElementRef.current.forEach((item) => item.pause());
    }
  }, [className]);

  if (!isGalaxy) return null;

  const handleShowModal = (ship) => {
    setShip(ship);
    setIsOpenModal(!isOpenModal);
  };
  const customStyled = {
    content: {},
    overlay: { zIndex: 200 },
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsActiveModal(false);
    onToggleScroll(true);
  };
  const handleChangeModal = () => {
    setIsActiveModal(true);
  };
  const handleChangeTribe = (tribe) => {
    setFilter(tribe);
  };

  return (
    <>
      <Modal
        ariaHideApp={false}
        style={customStyled}
        isOpen={isOpenModal}
        className="Modal"
        overlayClassName="Overlay"
        // shouldCloseOnOverlayClick={true}
      >
        {isActiveModal ? (
          <InfoScan ship={ship} onCloseModal={handleCloseModal} />
        ) : (
          <AR
            onCloseModal={handleCloseModal}
            onChangeModal={handleChangeModal}
          />
        )}
        {/* <InfoScan /> */}
      </Modal>
      <div
        className={classNames("section section--3 galaxy", {
          [className]: className,
        })}
        ref={galaxyRef}
      >
        {/* <div className="galaxy-scrollbar">
          <p className="galaxy-scrollbar__progress"></p>
        </div> */}
        <div className="slides" key={Date.now() + "galaxy"}>
          <div className="slides-box" ref={ellipseRef}>
            {data
              .filter(
                (item) => item.tribe.name.toLowerCase() === filter.toLowerCase()
              )
              .map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="slide"
                  ref={ref}
                  onClick={() => handleShowModal(item)}
                >
                  <div className="slide-content">
                    <img
                      className="slide__image"
                      src={require(`../assets/img/${item.image}`)}
                      alt=""
                    />
                    <div className="slide-info">
                      <div className="slide-box">
                        <img className="slide__line" src={IconLine} alt="" />
                        <h4 className="slide-header">
                          <img
                            src={require(`../assets/img/${item.tribe.image}`)}
                            alt=""
                          />
                          {item.tribe.name}
                        </h4>
                        <p className="slide__name">{item.name}</p>
                        <p className="slide__type">Type Ship: GOD</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <Elipse />
          </div>
        </div>
        <ul className="tribe-list">
          {tribe.map((item) => (
            <li
              key={item.id}
              className={`${
                item.name === filter ? "tribe-item active" : "tribe-item"
              }`}
              onClick={() => handleChangeTribe(item.name)}
            >
              <img
                src={require(`../assets/img/${item.image}`)}
                alt=""
                className="tribe-icon"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default React.memo(Galaxy);
