import BaseButton from "../../BaseButton/BaseButton";
import Icon from "../../../assets/images/printer.svg?react";
import css from "./PrintButton.module.css";

/**@module Preview */

/**
 * The PrintButton shows the print dialog for the CV
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of css classes to apply to the component
 * @returns {JSX.Element}
 */
function PrintButton({ classArr = [] }) {
  return (
    <BaseButton
      Icon={<Icon className={css.icon}></Icon>}
      classArr={[...classArr, css.main]}
      onClick={() => print()}
    >
      Imprimir
    </BaseButton>
  );
}

export default PrintButton;
