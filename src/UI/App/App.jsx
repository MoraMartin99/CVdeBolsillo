import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../variables.css";
import "../../global.css";
import css from "./App.module.css";
import { reduceToClassName } from "../../utils";

/**@module App */

/**
 * The configuration of the entire application
 * @typedef {Object} settings
 * @property {string} name The app name
 * @property {string} repoLabel A text that represents the repo
 * @property {string} repoUrl The URL of the source code of the app
 * @property {CurrentColorIcon} RepoIcon The icon component that represents the repo
 * @property {Array} content An ordered list containing the data required to build the views
 */

/**
 * The App component contains the entire application
 * @param {Object} props
 * @param {settings} props.settings
 * @returns {JSX.Element} The entire app
 */
function App({ settings: { name, repoLabel, repoUrl, RepoIcon, content } }) {
  const className = reduceToClassName(["app", css.layout]);

  return (
    <div className={className}>
      <Header
        appName={name}
        repoLabel={repoLabel}
        repoUrl={repoUrl}
        RepoIcon={RepoIcon}
      ></Header>
      <Main content={content}></Main>
    </div>
  );
}

export default App;
