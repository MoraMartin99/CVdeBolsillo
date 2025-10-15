import css from "./Main.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import buildScreens from "./buildScreens";
import Carrousel from "../Carrousel/Carrousel";
import { useCallback, useState } from "react";

/**@module Main */

/**
 * The Main component build the main screens
 * @param {object} props The component's properties
 * @param {Array<object>} props.screens A list containing the data required to build the screens
 * @param {number} [props.minDualPanelScreenWidth = 700] The minimum screen width at which it  renders the screens within 2 panels
 * @returns {JSX.Element}
 */
function Main({ screens: screensData, minDualPanelScreenWidth = 700 }) {
  const [data, setData] = useState({});
  const screenSize = useScreenSize();
  const hasIndependentLastPanel = screenSize >= minDualPanelScreenWidth;
  const onChange = useCallback((newData) => {
    setData((data) => ({ ...structuredClone(data), ...newData }));
  }, []);
  const screens = buildScreens({ screensData, userData: data, onChange });

  return (
    <main className={css.layout}>
      {hasIndependentLastPanel ? (
        <>
          <Carrousel screens={screens.slice(0, screens.length - 1)}></Carrousel>
          <Carrousel screens={screens.slice(-1)} l></Carrousel>
        </>
      ) : (
        <Carrousel screens={screens}></Carrousel>
      )}
    </main>
  );
}

export default Main;
