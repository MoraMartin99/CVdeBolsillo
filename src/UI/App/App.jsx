import "../../variables.css";
import "../../global.css";
import SingleScreenLayout from "./SingleScreenLayout/SingleScreenLayout";
import useScreenSize from "../../hooks/useScreenSize";

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
 * @param {Array<object>} cvTemplates A collection of CV templates
 * @returns {JSX.Element}
 */
function App({
  name,
  repoLabel,
  repoUrl,
  RepoIcon,
  screens,
  minDualPanelScreenWidth,
  cvTemplates,
}) {
  const screenSize = useScreenSize();

  return screenSize > minDualPanelScreenWidth ? null : (
    <SingleScreenLayout
      name={name}
      repoLabel={repoLabel}
      repoUrl={repoUrl}
      RepoIcon={RepoIcon}
      screens={screens}
      cvTemplates={cvTemplates}
    ></SingleScreenLayout>
  );
}

export default App;
