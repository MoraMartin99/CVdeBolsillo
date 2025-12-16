import FieldLabel from "./FieldLabel";
import Tip from "./Tip";
import FormButton from "./FormButton";
import baseCSS from "./field.module.css";
import css from "./ImageField.module.css";
import { reduceToClassName } from "../../../utils";
import TrashIcon from "../../../assets/images/trashIcon.svg?react";
import UploadToCloudIcon from "../../../assets/images/uploadToCloud.svg?react";
import { useRef } from "react";
import ImageMagnifier from "../../ImageMagnifier/ImageMagnifier";

/**@module ImageField */

/**
 * The value of the field
 * @typedef {object} value
 * @property {string} source A path to an image
 * @property {number} positionX The horizontal offset of the image relative to the left upper corner of the wrapper
 * @property {number} positionY The vertical offset of the image relative to the left upper corner of the wrapper
 * @property {number} scale The ratio of the computed size to the size defined in the styles
 */

/**
 * A function that evaluates if a value is valid or invalid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * A function that report data changes to the form model
 * @callback submitData
 * @param {object} data
 * @param {string} data.id The id of the component
 */

/**
 * The ImageField component represents a field that can contain an image
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component
 * @param {string} props.label The field tittle
 * @param {value} props.value
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {string} props.tip A message to the user that clarifies the constraints that makes a value valid. It has to be set in order to use the Constraint Validation API
 * @param {validator} props.validator A function that runs on change events and evaluates if a value is valid or invalid
 * @param {submitData} props.submitData A function that report data changes to the form model
 * @param {boolean} [props.isInvalid = false] if true sets the component as invalid, if false sets the component as valid.
 * @param {string} props.primaryActionLabel The text of the button responsible of launch the file selector
 * @param {string} props.destructiveActionLabel The text of the button responsible of removing the current image
 * @returns {JSX.Element}
 */
function ImageField({
  id,
  label,
  value = {},
  classArr = [],
  tip,
  validator,
  submitData,
  isInvalid: isInvalidProp = false,
  primaryActionLabel,
  destructiveActionLabel,
}) {
  const { source, positionX, positionY, scale } = value;
  const inputRef = useRef(null);

  const isInvalid = (value) => (validator ? !validator(value) : false);

  const onFileChange = ({ target }) => {
    const [file] = target.files;
    const { type } = file;
    if (!type.startsWith("image")) {
      resetFileInput();
      return;
    }
    const reader = new FileReader();
    reader.onload = ({ target: { result: path } }) => {
      const value = { source: path };
      submitData({
        id,
        value,
        isInvalid: isInvalid(value),
      });
    };
    reader.readAsDataURL(file);
  };

  const onImageManipulation = (value) => {
    submitData({
      id,
      value,
      isInvalid: isInvalid(value),
    });
  };

  const triggerFileInput = () => inputRef.current.click();

  const resetFileInput = () => {
    const value = {};
    submitData({
      id,
      value,
      isInvalid: isInvalid(value),
    });
  };

  return (
    <div className={reduceToClassName([...classArr, baseCSS.main, css.main])}>
      <input
        onChange={onFileChange}
        ref={inputRef}
        type="file"
        className={css.fileInput}
        accept="image/*"
        data-testid="fileInput"
        id={id}
      ></input>
      <FieldLabel classArr={[css.label]} htmlFor={id}>
        {label}
      </FieldLabel>
      <ImageMagnifier
        onChange={onImageManipulation}
        classArr={[css.imageMagnifier]}
        source={source}
        positionX={positionX}
        positionY={positionY}
        scale={scale}
        isInvalid={isInvalidProp}
      ></ImageMagnifier>
      <div className={css.buttonContainer}>
        <FormButton
          onClick={triggerFileInput}
          classArr={[css.button]}
          Icon={UploadToCloudIcon}
        >
          {primaryActionLabel}
        </FormButton>
        <FormButton
          onClick={resetFileInput}
          classArr={[css.button]}
          Icon={TrashIcon}
          variant="destructive"
        >
          {destructiveActionLabel}
        </FormButton>
      </div>
      <Tip classArr={[css.tip]} isVisible={isInvalidProp}>
        {tip}
      </Tip>
    </div>
  );
}

export default ImageField;
