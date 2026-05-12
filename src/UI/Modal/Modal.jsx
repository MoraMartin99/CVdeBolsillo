import { useRef } from "react";
import { reduceToClassName } from "../../utils";
import { useLayoutEffect } from "react";
import css from "./Modal.module.css";

/**@module Modal */

/**
 * A function that runs if a click is registered outside the modal's children. Useful to close the modal on outside click
 * @callback onOutsideClick
 * @param {*} value
 */

/**
 * The Modal component allows you to display an element as an overlay in the top layer of the app, preventing interaction with
 * other components and focusing the user interaction toward its descendants
 * @param {object} props The component properties
 * @param {boolean} [props.isOpen = false] The visibility state
 * @param {JSX.Element} props.children The content of the modal
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {onOutsideClick} onOutsideClick
 * @returns {JSX.Element}
 */
function Modal({ children, isOpen = false, classArr = [], onOutsideClick }) {
  const modalRef = useRef(null);
  const contentContainerRef = useRef(null);

  useLayoutEffect(() => {
    const modal = modalRef.current;
    const contentContainer = contentContainerRef.current;

    if (isOpen) {
      const body = document.body;
      body.style.overflow = "hidden";
      modal.showModal();
      const onClick = ({ target }) => {
        if (!contentContainer.contains(target) && onOutsideClick) {
          onOutsideClick();
        }
      };

      modal.addEventListener("click", onClick);

      return () => {
        modal.removeEventListener("click", onClick);
        body.style.overflow = "";
      };
    }

    modal.close();
  }, [isOpen, onOutsideClick]);

  return (
    <dialog
      ref={modalRef}
      className={reduceToClassName([...classArr, css.main])}
    >
      <div ref={contentContainerRef}>{children}</div>
    </dialog>
  );
}

export default Modal;
