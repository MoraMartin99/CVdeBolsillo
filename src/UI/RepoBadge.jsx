import styles from "./RepoBadge.module.css";

/**
 * The RepoBadge component lets you create a hyperlink badge to the git repo of your project
 * @module RepoBadge
 * @param {object} props The RepoBadge props
 * @param {Array<string>} [props.classArr = []] A list of CSS classes that can be apply to the component
 * @param {string} [props.label = ""] The label that should be display in some screen sizes
 * @param {string} props.repoUrl The url of the git repo
 * @param {JSX.Element} props.Icon The icon component that represents the repo
 * @returns JSX.Element
 */
function RepoBadge({ classArr = [], label = "", repoUrl, Icon }) {
  const classNames = [...classArr, styles.main].join(" ");

  return (
    <a
      className={classNames}
      href={typeof repoUrl === "string" ? repoUrl : ""}
      target="_blank"
      rel="noreferrer noopener"
    >
      <p className={styles.text}>{typeof label === "string" ? label : ""}</p>
      <Icon styles={styles}></Icon>
    </a>
  );
}

export default RepoBadge;
