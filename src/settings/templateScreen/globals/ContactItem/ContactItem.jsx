import { View } from "@react-pdf/renderer";
import style from "./style";

/**
 * Renders a way to contact the user
 * @param {object} props The component properties
 * @param {import("react").ReactElement} props.icon
 * @param {import("react").ReactElement} props.label The name of the contact item
 * @param {import("react").ReactElement} props.value The value of the contact item
 * @param {number} props.rowGap The distance between the label and the value
 * @param {number} props.columnGap The distance between the icon and the texts
 * @returns {JSX.Element}
 */
function ContactItem({ icon, label, value, rowGap, columnGap }) {
  return (
    <View style={{ ...style.main, gap: columnGap }}>
      {icon}
      <View style={{ ...style.labelContainer, gap: rowGap }}>
        {label}
        {value}
      </View>
    </View>
  );
}

export default ContactItem;
