import { View } from "@react-pdf/renderer";
import style from "./style";

/**
 * Renders a soft skill
 * @param {object} props The component properties
 * @param {import("react").ReactElement} props.icon
 * @param {import("react").ReactElement} props.text
 * @param {number} props.gap
 * @returns {JSX.Element}
 */
function SoftSkill({ icon, text, gap }) {
  return (
    <View style={{ ...style.main, gap }}>
      {icon}
      {text}
    </View>
  );
}

export default SoftSkill;
