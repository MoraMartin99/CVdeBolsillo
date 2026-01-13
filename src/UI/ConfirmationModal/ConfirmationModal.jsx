import ConfirmationButton from "./ConfirmationButton";
import css from "./ConfirmationModal.module.css";
import { reduceToClassName } from "../../utils";
import WarningIcon from "../../assets/images/warning.svg?react";
import Modal from "../Modal/Modal";

/**@module ConfirmationModal*/

/**
 * A callback that runs on click events
 * @callback onClickCallback
 */

/**
 * The ConfirmationModal component lets you display a modal with a menu to confirm the user wants to perform certain action.
 * An action is considered as accepted if the accept button registered a click.
 * An action is considered cancelled if the cancel button registered a click or if an area outside the menu registered a click
 * @param {object} props The component properties
 * @param {boolean} [props.isOpen = false] The visibility state
 * @param {string} props.message The primary text that explains the action the user is going to perform
 * @param {string} [props.tip = ""] Some extra information/clarification about the consequences of the action the user is going to perform (like a warning)
 * @param {onClickCallback} props.onAccept A function that runs when the user accepts the action
 * @param {onClickCallback} props.onCancel A function that runs when the user cancels the action
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function ConfirmationModal({
  isOpen = false,
  message,
  tip,
  onAccept,
  onCancel,
  classArr = [],
}) {
  return (
    <Modal
      onOutsideClick={onCancel}
      isOpen={isOpen}
      classArr={reduceToClassName([...classArr])}
    >
      <form className={css.main}>
        <h2 className={css.message}>{message}</h2>
        {tip ? (
          <p className={css.tip}>
            <WarningIcon className={css.tipIcon}></WarningIcon>
            {tip}
          </p>
        ) : undefined}
        <div className={css.buttonContainer}>
          <ConfirmationButton onClick={onCancel} variant="cancel">
            Cancelar
          </ConfirmationButton>
          <ConfirmationButton onClick={onAccept}>Aceptar</ConfirmationButton>
        </div>
      </form>
    </Modal>
  );
}

export default ConfirmationModal;
