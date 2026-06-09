import FieldLabel from "../FieldLabel";
import baseCSS from "../field.module.css";
import css from "./LevelField.module.css";
import { reduceToClassName } from "../../../../utils";

/**
 * A function that report data changes to the form model
 * @callback submitData
 * @param {string} id The id of the component
 * @param {object} data The properties to change
 */

/**
 * The levelField component captures the expertise in some skill
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component
 * @param {submitData} props.submitData A function that reports data changes to the form model
 * @param {string} [props.label = "Nivel"] The field tittle
 * @param {string} [props.minMark = "Mínimo"] The label for the minimum value
 * @param {string} [props.maxMark = "Máximo"] The label for the maximum value
 * @param {number} [props.min = 1] The minimum value
 * @param {number} [props.max = 10] The maximum value
 * @param {number} [props.step = 1] The distance between the snapping points relative to the maximum value
 * @param {number} [props.value = props.min]
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function LevelField({
  id,
  submitData,
  label = "Nivel",
  minMark = "Mínimo",
  maxMark = "Máximo",
  min = 1,
  max = 10,
  step = 1,
  value = min,
  classArr = [],
}) {
  const onChange = ({ target: { value: inputValue } }) => {
    submitData(id, { value: inputValue });
  };

  const buildTicks = (amount) => {
    const buildTick = (key) => <span key={key} className={css.tick}></span>;
    return Array.from(
      { length: Math.max(0, amount) },
      (_, index) => index + 1,
    ).map(buildTick);
  };

  return (
    <div
      style={{
        "--thumbWidth": `calc((var(--contentWidth) - 2 * var(--rangeInputBorderWidth))/${max} * ${step})`,
        "--valueDisplayMarginLeft": `calc(var(--thumbWidth) * ${value})`,
      }}
      className={reduceToClassName([...classArr, baseCSS.main, css.main])}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className={css.rangeContainer}>
        <div className={css.range}>
          <input
            className={css.rangeInput}
            type="range"
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={onChange}
          ></input>
          <div className={css.tickContainer}>{buildTicks(max - 2)}</div>
          <span className={css.valueDisplay}>{value}</span>
        </div>
        <span className={css.mark}>{minMark}</span>
        <span className={css.mark}>{maxMark}</span>
      </div>
    </div>
  );
}

export default LevelField;
