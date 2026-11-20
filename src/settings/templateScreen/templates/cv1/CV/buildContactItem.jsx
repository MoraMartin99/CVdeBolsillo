import ContactItem from "../../../globals/ContactItem/ContactItem";
import { styles } from "./styles";
import { Text } from "@react-pdf/renderer";
import Link from "../../../globals/Link/Link";
import LinkIcon from "./LinkIcon/Link";
import {
  contactItemLinkValueGap,
  contactItemRowGap,
  contactItemColumnGap,
} from "./styles";

/**
 * @typedef {Object} IconProps
 * @property {object} style
 */

/**
 * A ContactItem factory
 * @param {object} settings
 * @param {string} settings.label The name of the contact item
 * @param {string} settings.value The value of the contact item. If url is defined, the value is render as a link
 * @param {string} [settings.url] A url to the contact item
 * @param {React.Component<IconProps>} settings.Icon A reference to an svg components that supports the style prop
 * @param {string} settings.key An id
 * @returns {JSX.Element}
 */
function buildContactItem({ label, value, url, Icon, key }) {
  const valueComponent = <Text style={styles.contactItemValue}>{value}</Text>;
  return (
    <ContactItem
      key={key}
      icon={<Icon style={styles.contactItemIcon}></Icon>}
      rowGap={contactItemRowGap}
      columnGap={contactItemColumnGap}
      label={<Text style={styles.contactItemLabel}>{label}</Text>}
      value={
        url ? (
          <Link
            text={valueComponent}
            url={url}
            icon={<LinkIcon style={styles.contactItemLinkIcon}></LinkIcon>}
            gap={contactItemLinkValueGap}
          ></Link>
        ) : (
          valueComponent
        )
      }
    ></ContactItem>
  );
}

export default buildContactItem;
