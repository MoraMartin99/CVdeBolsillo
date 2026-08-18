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
  const contentRef = useRef(null);
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
    if (e.currentTarget !== contentRef.current || !onScreenNavigation) return;
    onScreenNavigation(contentRef.current);
  };

  const buildScreen = (child) => {
    return <Screen onScroll={onScreenScroll}>{child}</Screen>;
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
      ref={contentRef}
      // eslint-disable-next-line react/no-unknown-property
      onTransitionStart={onTransitionStart}
      style={{ ...externalStyle, ...styles.parent }}
    >
      {screensContent.map(buildScreen)}
    </div>
  );
}

export default ScreenCarrousel;
