import { View } from "@react-pdf/renderer";
import styles from "./style";

/**
 * Renders the user biography in the pdf
 * @param {object} props The component properties
 * @param {import("react").ReactElement} props.name The user name
 * @param {import("react").ReactElement} props.description An about me
 * @param {import("react").ReactElement} props.title The main user descriptor
 * @param {[number]|number} props.gap If gap is a number, applies the number as a gap for name, description and title. if gap is an array of numbers, the first item is use between name and title, the second number between title and description
 * @param {number} props.width
 * @returns {JSX.Element}
 */
function Bio({ name, description, title, gap, width }) {
  return (
    <View
      style={{ ...styles.main, width, gap: Array.isArray(gap) ? gap[1] : gap }}
    >
      <View
        style={{
          ...styles.nameContainer,
          gap: Array.isArray(gap) ? gap[0] : gap,
        }}
      >
        {name}
        {title}
      </View>
      {description}
    </View>
  );
}

export default Bio;
