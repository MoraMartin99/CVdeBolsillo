import { useEffect, useState } from "react";

/**@module useOverlay*/

/**
 * @typedef {(Object|"center")} position Defines the position of the overlay relative to the closest positioned ancestor
 * @property {xPosition} x Defines the position of the overlay relative to the horizontal axis
 * @property {yPosition} y Defines the position of the overlay relative to the vertical axis
 */

/**
 * @typedef {"left"|"center"|"right"} xPosition A keyword that represents a valid position for the horizontal axis
 */

/**
 * @typedef {"above"|"center"|"bellow"} yPosition A keyword that represents a valid position for the vertical axis
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
 * The useOverlay hook lets you set a component as an overlay relative to the closest positioned ancestor
 * @param {Object} settings
 * @param {Boolean} [settings.isVisible = false] The initial visibility state of the component. truthy values sets the component as visible, falsy as the oposite
 * @param {position} [settings.position = { x: "center", y: "bellow" }] Defines the position of the overlay relative to the closest positioned ancestor
 * @param {object} settings.ref A [reference object]{@link https://react.dev/reference/react/useRef#useref} that points to the target element
 * @example
 * const TestElement = ({ isVisible, position }) => {
   const targetRef = useRef(null);
   const [isVisible, setIsVisible, overlayStyle] = useOverlay({
     isVisible,
     position,
     ref: targetRef,
   });
   return (
     <div
       data-testid={parentId}
       style={{
         position: "relative",
       }}
     >
       <div
         style={{
           ...overlayStyle,
         }}
         data-testid={targetId}
         ref={targetRef}
       ></div>
     </div>
   );
 }
 * @returns {resultArray}
 */
function useOverlay({
  isVisible: initialValue = false,
  position: initialPosition,
  ref,
}) {
  const [isVisible, setIsVisible] = useState(Boolean(initialValue));
  useEffect(() => {
    const onClick = ({ target }) => {
      if (!ref.current.contains(target)) setIsVisible(false);
    };
    document.body.addEventListener("click", onClick);

    return () => document.body.removeEventListener("click", onClick);
  }, [ref]);
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

    const mergeStyles = (list) => {
      const allEntries = list.flatMap((item) => Object.entries(item));
      const filterTransforms = ([key]) => key === "transform";
      const reduceTransforms = (total, [key, value]) => {
        return [key, `${total[1]} ${value}`];
      };
      const transformEntry = allEntries
        .filter(filterTransforms)
        .reduce(reduceTransforms);
      return Object.fromEntries([...allEntries, transformEntry]);
    };

    overlayStyle = mergeStyles([overlayStyle, xProperties[x], yProperties[y]]);
  }

  return [isVisible, (value) => setIsVisible(Boolean(value)), overlayStyle];
}

export default useOverlay;
