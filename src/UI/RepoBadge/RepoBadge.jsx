import styles from "./RepoBadge.module.css";
import GithubIcon from "../../assets/images/githubLogo.svg?react";
import { reduceToClassName } from "../../utils";

/**
 * The RepoBadge component lets you create a hyperlink badge to the git repo of your project
 * @module RepoBadge
 * @param {object} props The RepoBadge props
 * @param {Array<string>} [props.classArr = []] A list of CSS classes that can be apply to the component
 * @param {string} [props.label = ""] The label that should be display in some screen sizes
 * @param {string} [props.repoUrl = ""] The url of the git repo
 * @param {CurrentColorIcon} [props.Icon = "githubLogo.svg"] The icon component that represents the repo
 * @returns JSX.Element
 */
function RepoBadge({
  classArr = [],
  label = "",
  repoUrl = "",
  Icon = GithubIcon,
}) {
  return (
    <a
      className={reduceToClassName([styles.main, "repobadge", ...classArr])}
      href={repoUrl}
      target="_blank"
      rel="noreferrer noopener"
    >
      <p className={styles.text}>{typeof label === "string" ? label : ""}</p>
      <Icon role={"img"} className={styles.icon}></Icon>
    </a>
  );
}

export default RepoBadge;
