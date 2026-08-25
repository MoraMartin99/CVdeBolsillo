import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PrintButton from "./PrintButton/PrintButton";
import ZoomControls from "./ZoomControls/ZoomControls";
import css from "./Preview.module.css";

/**
 * The Preview component allows you to visualize the CV
 * @param {object} props The component properties
 * @param {React.ReactNode} props.children The CV component
 * @returns {JSX.Element}
 */
function Preview({ children }) {
  return (
    <div className={css.main}>
      <TransformWrapper centerOnInit>
        {({ zoomIn, zoomOut }) => {
          return (
            <>
              <PrintButton classArr={[css.printButton]}></PrintButton>
              <ZoomControls
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                classArr={[css.zoomControls]}
              ></ZoomControls>
              <TransformComponent
                wrapperStyle={{
                  width: "var(--width)",
                  height: "var(--height)",
                }}
                wrapperClass={css.frame}
              >
                {children}
              </TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
    </div>
  );
}
export default Preview;
