import { useState } from "react";

/** @module  useAccordion*/

/**
 *  A function that coerced its parameter to a boolean that sets the isExpanded variable
 * @callback setIsExpanded
 * @param {*} value
 */

/**
 * @typedef {Object} style An object that define inline css properties
 */

/**
 * @typedef {Array<boolean|setIsExpanded|style|style>} resultArray The return value of the hook
 * @property {boolean} isExpanded A state variable that represents if true that the components is expanded, if false represents the oposite
 * @property {setIsExpanded} setIsExpanded The setter of the isExpanded variable
 * @property {style} parentStyle The inline css properties object for the parent element
 * @property {style} contentStyle The inline css properties object for the content element
 */

/**
 * @description
 * The useAccordion hook lets you set a component as collapsible
 * The target component must have the following structure:
 * <some parent>
 *  <some header>
 *  <some content>
 * </some parent>
 * @param {Boolean} [initialValue = false] If truthy initialize the component as collapsible, if falsy do the oposite
 * @returns {resultArray}
 *
 * @example
 * const TestElement = () => {
 *const [isExpanded, setIsExpanded, parentStyle, contentStyle] = useAccordion(false);
 *
 *const onClick = () => setIsExpanded(!isExpanded);
 *return (
 *  <div style={parentStyle} data-testid="parent">
 *    <header
 *      style={{
 *        width: "130px",
 *        height: "30px",
 *        backgroundColor: "LightSalmon",
 *      }}
 *      onClick={onClick}
 *    ></header>
 *    <main
 *      style={{
 *        width: "130px",
 *        backgroundColor: "YellowGreen",
 *        ...contentStyle,
 *      }}
 *    >
 *      <h1 style={{ fontSize: "12px" }}>Esto es un test</h1>
 *        <div
 *        style={{ width: "60px", height: "60px", backgroundColor: "cyan" }}
 *      ></div>
 *    </main>
 *  </div>
 *);
 *};
 */
const useAccordion = (initialValue = false) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(initialValue));
  let parentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "min-content 0fr",
    transition: "grid-template-rows var(--transitionTime, 0.15s) linear",
  };
  const contentStyle = { overflow: "hidden" };

  if (isExpanded) {
    parentStyle = { ...parentStyle, gridTemplateRows: "min-content 1fr" };
  }
  return [
    isExpanded,
    (value) => setIsExpanded(Boolean(value)),
    parentStyle,
    contentStyle,
  ];
};

export default useAccordion;
