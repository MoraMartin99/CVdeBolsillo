import homeLogo from "../../assets/images/homeLogo.svg";
import styles from "./Home.module.css";
import { reduceToClassName } from "../../utils";

/**
 * The Home component contains the name and logo of the app
 * @memberof module:Header
 * @param {object} prop The Home properties
 * @param {Array<string>} [prop.classArr = []] An array of classes to apply to the component
 * @param {JSX.Element|string} [prop.children = "appName"] A component/string to render as the content
 * @returns {JSX.Element}
 */
function Home({ classArr = [], children = "appName" }) {
  return (
    <a
      href=""
      className={reduceToClassName([styles.Home, "home", ...classArr])}
    >
      <img className={styles.logo} src={homeLogo} alt="Home logo" />
      <p className={styles.homeText}>{children}</p>
    </a>
  );
}

export default Home;
