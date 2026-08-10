import { useRef } from "react";
import css from "./Screen.module.css";

/**
 * @module Screen
 */

/**
 * A callback that runs on scroll events
 * @callback onScroll
 * @param {UIEvent} event
 */

/**
 * The Screen component allows to display its children inside a container that has an independent scroll
 * @param {Object} props The component props
 * @param {import("react").ReactNode} props.children
 * @param {number} [props.throttlingTimer = 15] The time in ms that the props.onScroll has to wait before it can be run again
 * @param {onScroll} props.onScroll A callback that runs on scroll events. The scroll event is throttle, so the function only runs after props.throttlingTimer
 * @param {import('react').CSSProperties} style An style object. You must set the --paddingTop and --minHeight custom properties
 * @returns {JSX.Element}
 */
function Screen({
  children,
  onScroll: onScrollExternal,
  throttlingTimer = 15,
  style,
}) {
  const hasToWaitRef = useRef(false);

  const onScroll = (e) => {
    if (hasToWaitRef.current) return;
    onScrollExternal(e);
    hasToWaitRef.current = true;
    setTimeout(() => (hasToWaitRef.current = false), throttlingTimer);
  };

  return (
    <div
      style={style}
      onScroll={onScrollExternal ? onScroll : undefined}
      className={css.main}
    >
      <div className={css.scrollItem}>{children}</div>
    </div>
  );
}

export default Screen;
