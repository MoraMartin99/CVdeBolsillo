import { useRef, useEffect } from "react";

/**@module useOnUpdate*/

/**
 * A regular function
 * @callback callback
 */

/**
 * The useOnUpdate hook lets you run an effect if a dependencies list changes after re-renders. Its a useEffect Hook that skips the initial render callback run
 * @param {callback} setup A callback that runs if a dependency changes after re-renders . The same as [useEffect]{@link https://react.dev/reference/react/useEffect#useeffect}
 * @param {Array} dependencies A list of reactive values. The same as [useEffect]{@link https://react.dev/reference/react/useEffect#useeffect}
 */
function useOnUpdate(setup, dependencies) {
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (!isInitialRender.current) {
      setup();
    } else {
      isInitialRender.current = false;
    }
  }, dependencies);
}

export default useOnUpdate;
