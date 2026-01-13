import { useEffect, useRef } from "react";
import { reduceToClassName } from "../../utils";
import css from "./Modal.module.css";

/**@module Modal */

/**
 * The Modal component allows you to display an element as an overlay in the top layer of the app, preventing interaction with
 * other components and focusing the user interaction toward its descendants
 * @param {object} props The component properties
 * @param {boolean} [props.isOpen = false] The visibility state
 * @param {JSX.Element} props.children The content of the modal
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function Modal({ children, isOpen = false, classArr = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const modal = ref.current;

    if (isOpen) {
      const body = document.body;
      body.style.overflow = "hidden";
      modal.showModal();
      const onClick = ({ clientX, clientY }) => {
        const isOutside = ({ clientX: x, clientY: y }) => {
          const { left, right, top, bottom } = modal.getBoundingClientRect();
          return x < left || x > right || y < top || y > bottom;
        };
        if (isOutside({ clientX, clientY })) modal.close();
      };

      modal.addEventListener("click", onClick);

      return () => {
        modal.removeEventListener("click", onClick);
        body.style.overflow = "";
      };
    }

    modal.close();
  }, [isOpen]);

  return (
    <dialog ref={ref} className={reduceToClassName([...classArr, css.main])}>
      {children}
    </dialog>
  );
}

export default Modal;
