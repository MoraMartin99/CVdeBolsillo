import css from "./Floating.module.css";

/**@module Floating */

/**
 * A container component fixed to the viewport
 * @param {Object} props The component props
 * @param {Array<React.ReactNode>} props.children
 * @param {HTMLElement} props.ref
 * @param {number} [props.offsetY = 0 ] The vertical space between the viewport`s top edge to the component`s top edge
 * @returns {JSX.Element}
 */
function Floating({ children, ref, offsetY = 0 }) {
  return (
    <div className={css.main} style={{ "--offsetY": `${offsetY}px` }} ref={ref}>
      {children}
    </div>
  );
}

export default Floating;
