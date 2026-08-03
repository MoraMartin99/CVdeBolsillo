import Home from "./Home";
import RepoBadge from "../RepoBadge/RepoBadge";
import styles from "./Header.module.css";

/**@module Header */

/**
 * The Header component
 * @param {object} props The Header properties
 * @param {string} [props.appName] A string to displays as the app name
 * @param {string} [props.repoLabel] A string to displays as the repo label on some screen sizes
 * @param {string} [props.repoUrl = ""] A url to the repo of the project
 * @param {CurrentColorIcon} [props.RepoIcon] A Icon component that represents the git server icon
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
