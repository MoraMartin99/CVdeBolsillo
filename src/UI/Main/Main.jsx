import css from "./Main.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import buildScreens from "./buildScreens";
import { useState } from "react";

/**@module Main */

/**
 * The Main component build the main screens
 * @param {object} props The component's properties
 * @param {Array<object>} props.content A list containing the data required to build the screens
 * @param {number} [props.minDualPanelScreenWidth = 700] The minimum screen width at which it  renders the screens within 2 panels
 * @returns {JSX.Element}
 */
function Main({ content, minDualPanelScreenWidth = 700 }) {
  const [data, setData] = useState({});
  const screenSize = useScreenSize();
  const hasIndependentLastPanel = screenSize >= minDualPanelScreenWidth;
  const onChange = (newData) => {
    setData({ ...structuredClone(data), ...newData });
  };

  return (
    <main className={css.layout}>
      {buildScreens({ content, data, onChange, hasIndependentLastPanel })}
    </main>
  );
}

export default Main;
