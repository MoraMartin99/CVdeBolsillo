import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../variables.css";
import "../../global.css";
import css from "./App.module.css";
import { reduceToClassName } from "../../utils";

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
  const className = reduceToClassName(["app", css.layout]);

  return (
    <div className={className}>
      <Header
        appName={name}
        repoLabel={repoLabel}
        repoUrl={repoUrl}
        RepoIcon={RepoIcon}
      ></Header>
      <Main
        screens={screens}
        minDualPanelScreenWidth={minDualPanelScreenWidth}
        cvTemplates={cvTemplates}
      ></Main>
    </div>
  );
}

export default App;
