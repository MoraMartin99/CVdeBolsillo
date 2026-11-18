import css from "./Preview.module.css";
import { PDFViewer } from "@react-pdf/renderer";

/**
 * The Preview component allows you to visualize the CV
 * @param {object} props The component properties
 * @param {React.ReactNode} props.children The CV component
 * @returns {JSX.Element}
 */
function Preview({ children }) {
  return (
    <PDFViewer style={{ width: "280px", height: "370px" }}>
      {children}
    </PDFViewer>
  );
}
export default Preview;
