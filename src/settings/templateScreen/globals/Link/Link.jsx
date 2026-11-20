import { Link as PrimitiveLink } from "@react-pdf/renderer";
import internalStyle from "./style";

/**
 * Renders a link in the pdf
 * @param {object} props The component properties
 * @param {import("react").ReactElement} props.text The render text
 * @param {string} props.url
 * @param {import("react").ReactElement} props.icon An image that signals that the text redirects to another site
 * @param {number} props.gap A gap between the text and the icon
 * @returns {JSX.Element}
 */
function Link({ text, url, icon, gap }) {
  return (
    <PrimitiveLink style={{ ...internalStyle.main, gap }} src={url}>
      {text}
      {icon}
    </PrimitiveLink>
  );
}

export default Link;
