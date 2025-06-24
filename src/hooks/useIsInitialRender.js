import { useRef, useEffect } from "react";

/**@module useIsInitialRender*/

/**
 * The return value of the [useRef hook]{@link https://react.dev/reference/react/useRef}
 * @typedef {Object} isInitial
 * @property {boolean} current is set to true if its the initial render, if not returns false
 */

/**
 * The useIsInitialRender hook returns an [useRef]{@link https://react.dev/reference/react/useRef} that represents if the current rendering cycle is the initial.
 * Note: this hook doesn't work as intended inside [useEffects]{@link https://react.dev/reference/react/useEffect#useeffect} hooks
 * @returns {isInitial}
 */
function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  return isInitialRender;
}

export default useIsInitialRender;
