import { useState } from "react";
import StateIcon from "../../assets/images/arrow.svg?react";
import { reduceToClassName } from "../../utils";
import styles from "./Accordion.module.css";

/**@module Accordion */

/**
 *The Accordion component lets you create a collapsible UI
 @property {Object} prop The Accordion prop
 * @property {string} prop.name The name and label of the Accordion
 * @property {CurrentColorIcon} prop.Icon The icon component that represents the Accordion
 * @property {Array<JSX.Element>} prop.children An ordered group of child components
 * @property {Array<string>} [prop.classArr = []]  A CSS classes list that style the parent element using custom properties like: --mainWidth, --minHeight, --BGColor, --color
 * @returns {JSX.Element}
 */
function Accordion({ name, Icon, children, classArr = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleExpansion = () => (isOpen ? setIsOpen(false) : setIsOpen(true));
  const mainClassArr = [styles.main, "Accordion", ...classArr];
  if (isOpen) mainClassArr.push(styles.expand);

  return (
    <div className={reduceToClassName(mainClassArr)}>
      <header onClick={toggleExpansion}>
        <button className={reduceToClassName([styles.headerButton])}>
          {Icon ? (
            <Icon
              className={reduceToClassName(["customIcon", styles.customIcon])}
            ></Icon>
          ) : undefined}
          {name}
          <StateIcon
            className={reduceToClassName(["StateIcon", styles.stateIcon])}
          ></StateIcon>
        </button>
      </header>
      <div className={reduceToClassName(["content", styles.content])}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
