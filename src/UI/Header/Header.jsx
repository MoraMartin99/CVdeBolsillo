import Home from "./Home";
import RepoBadge from "../RepoBadge/RepoBadge";
import styles from "./Header.module.css";

/**@module Header */

/**
 * The Header component
 * @param {object} prop The Header properties
 * @param {string} [prop.appName] A string to displays as the app name
 * @param {string} [prop.repoLabel] A string to displays as the repo label on some screen sizes
 * @param {string} [prop.repoUrl = ""] A url to the repo of the project
 * @param {CurrentColorIcon} [prop.RepoIcon] A Icon component that represents the git server icon
 * @returns {JSX.Element}
 */
function Header({ appName, repoLabel, repoUrl = "", RepoIcon }) {
  return (
    <header className={styles.layout}>
      <Home classArr={[styles.center]}>{appName}</Home>
      <RepoBadge
        Icon={RepoIcon}
        classArr={[styles.right]}
        label={repoLabel}
        repoUrl={repoUrl}
      ></RepoBadge>
    </header>
  );
}

export default Header;
