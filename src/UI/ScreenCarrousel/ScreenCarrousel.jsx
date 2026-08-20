import { useEffect, useCallback, useRef } from "react";
import useAccordion from "../../hooks/useAccordion";
import { isEqual } from "lodash";
import Screen from "./Screen/Screen";
import css from "./ScreenCarrousel.module.css";

function ScreenCarrousel({
  screensContent = [],
  currentScreen,
  style: externalStyle,
  onScreenNavigation,
  onScreenScroll,
}) {
  const componentRef = useRef(null);
  const getVisibilities = useCallback(
    (_, index) => {
      return index === currentScreen ? {} : { isHidden: true };
    },
    [currentScreen],
  );

  const { styles, setVisibilities } = useAccordion({
    visibilities: screensContent.map(getVisibilities),
    isHorizontal: true,
  });

  const onTransitionStart = (e) => {
    if (e.currentTarget !== componentRef.current || !onScreenNavigation) return;
    const getScreenElement = (item) => item.children.item(0);
    onScreenNavigation(
      [...componentRef.current.children].map(getScreenElement),
    );
  };

  const buildScreen = (child, index) => {
    return (
      <Screen key={index} onScroll={(e) => onScreenScroll(e, index)}>
        {child}
      </Screen>
    );
  };

  const buildChildContainer = (child, index) => {
    return (
      <div style={styles.childContainer} key={index}>
        {child}
      </div>
    );
  };

  useEffect(() => {
    const stateSetter = (lastValue) => {
      const newValue = screensContent.map(getVisibilities);

      return isEqual(lastValue, newValue) ? lastValue : newValue;
    };
    setVisibilities(stateSetter);
  }, [getVisibilities, screensContent, setVisibilities]);

  return (
    <div
      className={css.main}
      ref={componentRef}
      // eslint-disable-next-line react/no-unknown-property
      onTransitionStart={onTransitionStart}
      style={{ ...externalStyle, ...styles.parent }}
    >
      {screensContent.map(buildScreen).map(buildChildContainer)}
    </div>
  );
}

export default ScreenCarrousel;
