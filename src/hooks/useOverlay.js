import { useState } from "react";

/**@module useOverlay*/

/**
 * @typedef {(Object|"center")} position Defines the position of the overlay relative to the closest absolute ancestor
 * @property {xPosition} x Defines the position of the overlay relative to the horizontal axis
 * @property {yPosition} y DEfines the position of the overlay relative to the vertical axis
 */

/**
 * @typedef {"left"|"center"|"right"} xPosition A keyword that represents a valid positions for the horizontal axis
 */

/**
 * @typedef {"above"|"center"|"bellow"} yPosition A keyword that represents a valid positions for the vertical axis
 */

/**
 *  A function that coerced its parameter to a boolean that sets the visibility state
 * @callback setIsVisible
 * @param {*} value
 */

/**
 * @typedef {Object} overlayStyle A style object for the target element that defines the inline css properties required for the overlay behavior.
 */

/**
 * @typedef {Array} resultArray The return value of the hook
 * @property {Boolean} isVisible A state variable that represents if true that the component is visible, if false the oposite
 * @property {setIsVisible} setIsVisible The setter of the state variable
 * @property {overlayStyle} overlayStyle The inline css properties object for the target element
 */

/**
 * The useOverlay hook lets you set a component as an overlay relative to the closest absolute ancestor
 * @param {Object} props The component properties
 * @param {Boolean} [props.initialValue = false] The initial visibility state of the component. truthy values sets the component as visible, falsy as the oposite
 * @param {position} [props.position = { x: "center", y: "bellow" }] Defines the position of the overlay relative to the closest absolute ancestor
 * @returns {resultArray}
 */
function useOverlay({ initialValue = false, position: initialPosition }) {
  const [isVisible, setIsVisible] = useState(Boolean(initialValue));
  let overlayStyle = { position: "absolute" };
  const CENTER = "center";
  const LEFT = "left";
  const RIGHT = "right";
  const ABOVE = "above";
  const BELLOW = "bellow";
  const defaultPosition = { x: "center", y: "bellow" };
  const position = { ...defaultPosition, ...initialPosition };

  if (!isVisible) overlayStyle = { ...overlayStyle, display: "none" };
  if (position === CENTER) {
    overlayStyle = {
      ...overlayStyle,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  } else if (typeof position === "object") {
    const { x, y } = position;
    const xProperties = {
      [CENTER]: {
        left: "50%",
        transform: "translateX(-50%)",
      },
      [LEFT]: {
        left: "var(--overLayLeft, 0px)",
      },
      [RIGHT]: {
        right: "var(--overLayRight, 0px)",
      },
    };
    const yProperties = {
      [CENTER]: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      [ABOVE]: {
        top: "calc(-1 * var(--overLayGap, 0px))",
        transform: "translateY(-100%)",
      },
      [BELLOW]: {
        bottom: "var(--overLayGap, 0px)",
        transform: "translateY(100%)",
      },
    };
    overlayStyle = {
      ...overlayStyle,
      ...xProperties[x],
      ...yProperties[y],
    };
  }

  return [isVisible, (value) => setIsVisible(Boolean(value)), overlayStyle];
}

export default useOverlay;
