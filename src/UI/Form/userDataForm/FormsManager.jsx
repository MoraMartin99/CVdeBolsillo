import { reduceToClassName } from "../../../utils";
import css from "./FormsManager.module.css";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import FormButton from "./FormButton";
import TrashIcon from "../../../assets/images/trashIcon.svg?react";
import FeatherIcon from "../../../assets/images/featherIcon.svg?react";
import { useState } from "react";
import formFactory from "../formFactory";

/**@module FormsManager */

/**
 * The FormsManager component allows you to generate, clean, and load examples into a collection of forms.
 * @param {object} props The component properties
 * @param {import("../../../hooks/useFormModel").model} props.model See [model in useFormModel]{@link module:useFormModel} for more details
 * @param {import("../../../hooks/useFormModel").resetModel} props.resetModel See [resetModel in useFormModel]{@link module:useFormModel} for more details
 * @param {import("../../../hooks/useFormModel").loadExamples} props.loadExamples See [loadExamples in useFormModel]{@link module:useFormModel} for more details
 * @returns {JSX.Element}
 */

function FormsManager({ model, resetModel, loadExamples }) {
  const [confirmationProps, setConfirmationProps] = useState({
    isOpen: false,
  });

  const closeConfirmationMenu = () => setConfirmationProps({ isOpen: false });

  const showLoadExampleModal = () => {
    const onAccept = () => {
      closeConfirmationMenu();
      loadExamples();
    };
    const message = "¿Desea cargar el ejemplo?";
    const tip = "Se eliminaran sus datos de los formularios";
    const isOpen = true;
    setConfirmationProps({
      onAccept,
      message,
      tip,
      isOpen,
      onCancel: () => closeConfirmationMenu(),
    });
  };

  const showResetFormsModal = () => {
    const onAccept = () => {
      closeConfirmationMenu();
      resetModel();
    };
    const message = "¿Desea limpiar los formularios?";
    const isOpen = true;
    setConfirmationProps({
      onAccept,
      message,
      isOpen,
      onCancel: () => closeConfirmationMenu(),
    });
  };

  return (
    <div className={reduceToClassName(["userDataContainer", css.main])}>
      <ConfirmationModal {...confirmationProps}></ConfirmationModal>
      <div
        className={reduceToClassName(["formsContainer", css.formsContainer])}
      >
        {formFactory(model)}
      </div>
      <div
        className={reduceToClassName([
          "buttonsContainer",
          css.buttonsContainer,
        ])}
      >
        <FormButton
          onClick={showResetFormsModal}
          Icon={TrashIcon}
          variant="destructive"
        >
          Limpiar formulario
        </FormButton>
        <FormButton onClick={showLoadExampleModal} Icon={FeatherIcon}>
          Cargar ejemplo
        </FormButton>
      </div>
    </div>
  );
}

export default FormsManager;
