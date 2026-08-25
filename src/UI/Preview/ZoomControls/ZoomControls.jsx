import css from "./ZoomControls.module.css";
import BaseButton from "../../BaseButton/BaseButton";
import MinusIcon from "../../../assets/images/minus.svg?react";
import PlusIcon from "../../../assets/images/plusV2.svg?react";

/**@module Preview */

/**
 * The zoomIn handler
 * @callback zoomIn
 */

/**
 * The zoomOut handler
 * @callback zoomOut
 */

/**
 * The ZoomControl allows you to zoom in and out in the CV
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of css classes to apply to the component
 * @param {zoomIn} props.zoomIn
 * @param {zoomOut} props.zoomOut
 * @returns {JSX.Element}
 */
function ZoomControl({ classArr = [], zoomIn, zoomOut }) {
  return (
    <div className={[...classArr, css.main].join(" ")}>
      <BaseButton
        onClick={() => zoomOut()}
        Icon={<MinusIcon className={css.icon}></MinusIcon>}
        classArr={[css.button]}
      ></BaseButton>
      Zoom
      <BaseButton
        onClick={() => zoomIn()}
        Icon={<PlusIcon className={css.icon}></PlusIcon>}
        classArr={[css.button]}
      ></BaseButton>
    </div>
  );
}

export default ZoomControl;
