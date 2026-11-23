import ContactItem from "../../../../globals/ContactItem/ContactItem";
import { Text } from "@react-pdf/renderer";
import Link from "../../../../globals/Link/Link";
import LinkIcon from "../LinkIcon/Link";
import { style, rowGap, columnGap, linkGap } from "./style";

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
  const valueComponent = <Text style={style.value}>{value}</Text>;
  return (
    <ContactItem
      key={key}
      icon={<Icon style={style.itemIcon}></Icon>}
      rowGap={rowGap}
      columnGap={columnGap}
      label={<Text style={style.label}>{label}</Text>}
      value={
        url ? (
          <Link
            text={valueComponent}
            url={url}
            icon={<LinkIcon style={style.linkIcon}></LinkIcon>}
            gap={linkGap}
          ></Link>
        ) : (
          valueComponent
        )
      }
    ></ContactItem>
  );
}

export default buildContactItem;
