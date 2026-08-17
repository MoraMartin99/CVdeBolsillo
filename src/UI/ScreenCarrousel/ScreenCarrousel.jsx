import { useEffect, useCallback, useRef } from "react";
import useAccordion from "../../hooks/useAccordion";
import { isEqual } from "lodash";
import Screen from "./Screen/Screen";

function ScreenCarrousel({
  screensContent = [],
  currentScreen,
  style: externalStyle,
  onCollapseStart,
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
    if (e.currentTarget !== contentRef.current || !onCollapseStart) return;
    onCollapseStart(contentRef.current);
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
