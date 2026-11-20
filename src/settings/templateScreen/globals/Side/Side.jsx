import { View } from "@react-pdf/renderer";
import styles from "./style";

/**
 * Renders the side area in the pdf
 * @param {object} props The component properties
 * @param {import("react").ReactNode} props.children
 * @param {string} props.backgroundColor
 * @returns {JSX.Element}
 */
function Side({ children, backgroundColor }) {
  return <View style={{ ...styles.main, backgroundColor }}>{children}</View>;
}

export default Side;
