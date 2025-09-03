import { useEffect, useState } from "react";

/**@module  useScreenSize*/

/**
 * The useScreenSize hook returns the window's size on every resize event.
 * Its initial return value is the current window's size
 * @example
 * const TestElement = () => {
  const size = useScreenSize();
  return <p>{size}</p>;
};
 * @returns {number} The current window's size
 */
function useScreenSize() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const onResize = () => setScreenSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return screenSize;
}

export default useScreenSize;
