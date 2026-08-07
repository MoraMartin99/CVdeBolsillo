import { useState } from "react";

/** @module  useAccordion*/

/**
 * @typedef {import('react').CSSProperties} CSSProperties
 * @typedef {import('react').SetStateAction<Array<visibility>>} VisibilityState
 */

/**
 * The visibility state of a childContainer
 * @typedef {object} visibility
 * @property {boolean} isHidden
 */

/**
 * @typedef {object} styles
 * @property {CSSProperties} parent
 * @property {CSSProperties} childContainer
 */

/**
 * @description
 * The useAccordion hook lets you set a component as collapsible
 * The target component must have the following structure:
 * <parent>
 *  <childContainer>
 *    <child>
 *  <childContainer>
 *  ...
 * </parent>
 * @param {object} settings
 * @param {Array<visibility>} [settings.visibilities = []] The visibility states of the childContainers. The index of each visibility must match the index of the childContainer
 * @param {boolean} [settings.isHorizontal = false] if true sets the parent as a column-only container, if false sets it as row-only
 * @returns {[styles,import('react').Dispatch<import('react').SetStateAction<Array<visibility>>>]}
 *
 * @example
 * function Target({
 *   visibilities: initialVisibilities,
 *   isHorizontal,
 *   items,
 * }) {
 *   const [styles, setVisibilities] = useAccordion({
 *     visibilities: initialVisibilities,
 *     isHorizontal,
 * });
 *
 * const buildChildContainer = (child, index) => {
 *   return (
 *    <div key={index} style={styles.childContainer}>
 *       {child}
 *     </div>
 *   );
 * };
 *
 * return (
 *   <div style={styles.parent}>
 *       {items.map(buildChildContainer)}
 *     </div>
 * );
 * }
 */
const useAccordion = ({
  visibilities: initialVisibilities = [],
  isHorizontal = false,
}) => {
  const [visibilities, setVisibilities] = useState(initialVisibilities);

  const setSize = ({ isHidden }) => (isHidden ? "0fr" : "1fr");

  const getColumnValue = () => {
    return isHorizontal ? visibilities.map(setSize).join(" ") : "1fr";
  };

  const getRowValue = () => {
    return isHorizontal ? "1fr" : visibilities.map(setSize).join(" ");
  };

  const getTransitionValue = () => {
    return `${isHorizontal ? "grid-template-columns" : "grid-template-rows"} var(--transitionTime, 0.15s) linear`;
  };

  const parent = {
    display: "grid",
    gridTemplateColumns: getColumnValue(),
    gridTemplateRows: getRowValue(),
    transition: getTransitionValue(),
  };

  return [{ parent, childContainer: { overflow: "hidden" } }, setVisibilities];
};

export default useAccordion;
