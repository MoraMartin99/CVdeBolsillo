import "../../variables.css";
import "../../global.css";
import SingleScreenLayout from "./SingleScreenLayout/SingleScreenLayout";
import useScreenSize from "../../hooks/useScreenSize";
import useFormModel from "../../hooks/useFormModel";
import { useRef, useState } from "react";
import Header from "../Header/Header";
import ScreenNav from "../ScreenNav/ScreenNav";
import buildScreenContent from "./buildScreenContent/buildScreenContent";

/**@module App */

/**
 * The App component contains the entire application
 * @param {Object} props
 * @param {string} props.name The app name
 * @param {string} props.repoLabel A text that represents the repo
 * @param {string} props.repoUrl The URL of the source code of the app
 * @param {CurrentColorIcon} props.RepoIcon The icon component that represents the repo
 * @param {Array<object>} props.screens The data required to build the app content
 * @param {number} props.minDualPanelScreenWidth The min width in px of the viewport at which the dual screen layout is displayed
 * @returns {JSX.Element}
 */
function App({
  name,
  repoLabel,
  repoUrl,
  RepoIcon,
  screens = [],
  minDualPanelScreenWidth,
}) {
  const getUserDataScreen = (screens) => {
    return screens.find(({ id }) => id === "userForm");
  };
  const getTemplateScreen = (screens) => {
    return screens.find(({ id }) => id === "templateForm");
  };
  const { content, templates } = getUserDataScreen(screens);
  const screenSize = useScreenSize();
  const { model, resetModel, loadExamples } = useFormModel(content, templates);
  const [cvTemplateId, setCVTemplateId] = useState(
    getTemplateScreen(screens).id,
  );
  const [currentScreen, setCurrentScreen] = useState(0);
  const headerRef = useRef(null);

  const myHeader = (
    <Header
      ref={headerRef}
      appName={name}
      repoLabel={repoLabel}
      repoUrl={repoUrl}
      RepoIcon={RepoIcon}
    ></Header>
  );

  const createTab = ({ label, id }, index) => {
    return {
      label,
      id,
      isCurrentTab: index === currentScreen,
    };
  };

  const myScreenNav = (
    <ScreenNav
      setCurrentScreen={setCurrentScreen}
      tabs={screens.map(createTab)}
    ></ScreenNav>
  );

  const buildScreenContentSettings = (screen) => {
    const buildUserDataScreenSettings = () => {
      return { model, resetModel, loadExamples };
    };

    const buildTemplateScreenSettings = ({ id, templates }) => {
      return { id, templates, setCVTemplateId, cvTemplateId };
    };

    const builders = {
      userForm: buildUserDataScreenSettings,
      templateForm: buildTemplateScreenSettings,
    };

    return builders[screen.id]?.(screen);
  };

  const screensContent = screens
    .map(buildScreenContentSettings)
    .map(buildScreenContent);

  return screenSize > minDualPanelScreenWidth ? null : (
    <SingleScreenLayout
      name={name}
      repoLabel={repoLabel}
      repoUrl={repoUrl}
      RepoIcon={RepoIcon}
      screens={screens}
    ></SingleScreenLayout>
  );
}

export default App;
