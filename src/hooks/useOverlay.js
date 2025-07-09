import { useState } from "react";

/**@module useOverlay*/

/**
 * @typedef {(Object|"center")} position Defines the position of the overlay relative to the closest absolute ancestor
 * @property {xPosition} x Defines the position of the overlay relative to the horizontal axis
 * @property {yPosition} y DEfines the position of the overlay relative to the vertical axis
 */

/**
 * @typedef {"left"|"center"|"right"} xPosition A keyword that represents the valid positions for the horizontal axis
 */

/**
 * @typedef {"above"|"center"|"bellow"} yPosition A keyword that represents the valid positions for the vertical axis
 */

/**
 * @callback setIsOpen A function that coerced its parameter to a boolean that sets the visibility state
 * @param {*} value
 */

/**
 * @typedef {Object} containerStyle A style object for the target container that defines the inline css properties required for the overlay behavior.
 */

/**
 * @typedef {Array} resultArray The return value of the hook
 * @property {Boolean} isOpen A state variable that represents if true that the component is visible, if false the oposite
 * @property {setIsOpen} setIsOpen The setter of the state variable
 * @property {containerStyle} containerStyle The inline css properties object
 */

/**
 * The useOverlay hook lets you set a component as an overlay relative to the closest absolute ancestor
 * @param {Boolean} [initialValue = false] The initial visibility state of the component. truthy values sets the component as visible, falsy as the oposite
 * @param {position} [position = { x: "center", y: "bellow" }] Defines the position of the overlay relative to the closest absolute ancestor
 * @returns {resultArray}
 */
function useOverlay(
  initialValue = false,
  position = { x: "center", y: "bellow" },
) {
  const [isOpen, setIsOpen] = useState(Boolean(initialValue));
  let containerStyle = { position: "absolute" };
  const CENTER = "center";
  const LEFT = "left";
  const RIGHT = "right";
  const ABOVE = "above";
  const BELLOW = "bellow";

  if (!isOpen) containerStyle = { ...containerStyle, display: "none" };
  if (position === CENTER) {
    containerStyle = {
      ...containerStyle,
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
    containerStyle = {
      ...containerStyle,
      ...xProperties[x],
      ...yProperties[y],
    };
  }

  return [isOpen, (value) => setIsOpen(Boolean(value)), containerStyle];
}

export default useOverlay;
