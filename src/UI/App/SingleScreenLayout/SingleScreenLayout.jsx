import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../../Header/Header";
import Floating from "./Floating/Floating";
import ScreenNav from "../../ScreenNav/ScreenNav";
import ScreenCarrousel from "../../ScreenCarrousel/ScreenCarrousel";
import buildScreenContent from "../buildScreenContent/buildScreenContent";
import css from "./SingleScreenLayout.module.css";

function SingleScreenLayout({ name, repoLabel, repoUrl, RepoIcon, screens }) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const lastScrolledScreenRef = useRef(currentScreen);
  const floatingOffsetIsLockedRef = useRef(false);
  const [floatingHeight, setFloatingHeight] = useState(null);
  const [floatingOffsetY, setFloatingOffsetY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(null);
  const headerRef = useRef(null);
  const floatingRef = useRef(null);
  const screensScrollInfoRef = useRef(
    screensContent.map(() => {
      return { scrollTop: 0, floatingOffsetY };
    }),
  );

  const updateSlotScrollInfo = (index, settings) => {
    const updateSettings = (item, settingsIndex) => {
      return settingsIndex === index ? settings : item;
    };

    screensScrollInfoRef.current =
      screensScrollInfoRef.current.map(updateSettings);
  };

  useLayoutEffect(() => {
    setFloatingHeight(floatingRef.current.offsetHeight);
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (currentScreen !== lastScrolledScreenRef.current) return;
    updateSlotScrollInfo(currentScreen, {
      ...screensScrollInfoRef.current[currentScreen],
      floatingOffsetY,
    });
  }, [floatingOffsetY, currentScreen]);

  const onScroll = ({ target }, screenIndex) => {
    const isSameSlot = () => lastScrolledScreenRef.current === currentScreen;
    const isCloseEnough = (a, b) => {
      const tolerance = 5;
      return Math.abs(Math.abs(a) - Math.abs(b)) <= tolerance;
    };
    const stateSetter = (lastValue) => {
      const estimatedValue =
        -1 * Math.min(headerRef.current.offsetHeight, target.scrollTop);
      if (!isSameSlot()) floatingOffsetIsLockedRef.current = true;
      if (
        isCloseEnough(estimatedValue, lastValue) &&
        floatingOffsetIsLockedRef.current
      ) {
        floatingOffsetIsLockedRef.current = false;
      }

      lastScrolledScreenRef.current = currentScreen;

      return floatingOffsetIsLockedRef.current ? lastValue : estimatedValue;
    };

    updateSlotScrollInfo(screenIndex, {
      ...screensScrollInfoRef.current[screenIndex],
      scrollTop: target.scrollTop,
    });
    setFloatingOffsetY(stateSetter);
  };

  const onScreenNavigation = (screens) => {
    const getDelta = (a, b) => (b - a) * -1;
    const delta = getDelta(
      screensScrollInfoRef.current[currentScreen].floatingOffsetY,
      floatingOffsetY,
    );

    if (!delta) return;

    screens[currentScreen].scrollBy({
      top: delta,
      behavior: "instant",
    });
    updateSlotScrollInfo(currentScreen, {
      ...screensScrollInfoRef.current[currentScreen],
      floatingOffsetY,
    });
  };

  return (
    <div className={css.main}>
      <Floating ref={floatingRef} offsetY={floatingOffsetY}>
        <Header
          ref={headerRef}
          appName={name}
          repoLabel={repoLabel}
          repoUrl={repoUrl}
          RepoIcon={RepoIcon}
        ></Header>
        <ScreenNav
          setCurrentScreen={setCurrentScreen}
          tabs={screens.map(createTab)}
        ></ScreenNav>
      </Floating>
      <ScreenCarrousel
        screensContent={screens
          .map(getScreenContentSettings)
          .map(buildScreenContent)}
      ></ScreenCarrousel>
    </div>
  );
}

export default SingleScreenLayout;
