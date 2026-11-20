import { Document as PrimitiveDoc, Page } from "@react-pdf/renderer";

/**
 * The settings for the page
 * @typedef {object} pageSettings
 * @property {string} size See {@link https://github.com/diegomura/react-pdf/blob/master/packages/layout/src/page/getSize.ts react-pdf sizes }
 */

/**
 * Sets the pdf document
 * @param {object} props The component properties
 * @param {string} props.title The default name of the file
 * @param {import("react").ReactNode} props.children
 * @param {pageSettings} props.page
 * @returns {JSX.Element}
 */
function Document({ title, children, page }) {
  return (
    <PrimitiveDoc title={title}>
      <Page size={page.size}>{children}</Page>
    </PrimitiveDoc>
  );
}

export default Document;
