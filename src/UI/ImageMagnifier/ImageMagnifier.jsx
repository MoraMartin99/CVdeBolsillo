import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import css from "./ImageMagnifier.module.css";
import placeholderSrc from "../../assets/images/imagePlaceholder.svg";
import { reduceToClassName } from "../../utils";
import { useRef } from "react";

/**@module ImageMagnifier*/

/**
 * The getComputedSize function return the computed width and height of an HTML element
 * @param {Element} element An HTML element
 * @returns {Array<number>} A list containing the width and height
 */
const getComputedSize = (element) => {
  const { width, height } = getComputedStyle(element);
  const getMagnitude = (size) => parseFloat(size.slice(0, -2));
  return [width, height].map(getMagnitude);
};

/**
 *  A function that runs on zoom and panning events
 * @callback onChange
 * @param {object} data
 * @param {string} data.source A path to an image
 * @param {number} data.positionX The horizontal offset of the image relative to the left upper corner of the wrapper
 * @param {number} data.positionY The vertical offset of the image relative to the left upper corner of the wrapper
 * @param {number} data.scale The ratio of the computed size to the size defined in the styles
 * @param {number} data.frameWidth The width of the frame that shows the image in px
 * @param {number} data.frameHeight The height of the frame that shows the image in px
 * @param {number} data.computedWidth The computed width of the image in px
 * @param {number} data.computedHeight The computed height of the image in px
 */

/**
 * The ImageMagnifier componente displays an image that can be zoomed and panned
 * @param {object} props The component properties
 * @param {string} [props.source = placeholderSrc] A path to an image
 * @param {onChange} props.onChange A function that runs on zoom and panning events
 * @param {string} props.alt The [alt]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#alt} attribute  for the img
 * @param {boolean} [props.isInvalid = false] If true applies the invalid styles
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {number} props.positionX The horizontal offset of the image relative to the left upper corner of the wrapper
 * @param {number} props.positionY The vertical offset of the image relative to the left upper corner of the wrapper
 * @param {number} props.scale The ratio of the computed size to the size defined in the styles
 * @returns {JSX.Element}
 */
function ImageMagnifier({
  source = placeholderSrc,
  onChange,
  alt,
  isInvalid = false,
  classArr = [],
  positionX,
  positionY,
  scale,
}) {
  const wrapperStyle = { width: "var(--size)", height: "var(--size)" };
  const wrapperClass = reduceToClassName([
    ...classArr,
    css.main,
    isInvalid ? css.invalid : "",
  ]);
  const hasPlaceholder = () => source === placeholderSrc;

  const transformationRef = useRef(null);
  const hasImageManipulationStoppedRef = useRef(false);

  const reportChange = ({ state, instance }) => {
    if (!hasImageManipulationStoppedRef.current) return;

    const [frameWidth, frameHeight] = getComputedSize(
      instance.wrapperComponent,
    );
    const [computedWidth, computedHeight] = getComputedSize(
      instance.contentComponent,
    );
    onChange({
      source,
      positionX: state.positionX,
      positionY: state.positionY,
      scale: state.scale,
      frameWidth,
      frameHeight,
      computedWidth,
      computedHeight,
    });
  };

  const onImageManipulationStart = () => {
    hasImageManipulationStoppedRef.current = false;
  };

  const onImageManipulationStop = (settings) => {
    hasImageManipulationStoppedRef.current = true;
    reportChange(settings);
  };

  const buildTransformComponent = ({ resetTransform, setTransform }) => {
    const onLoad = ({ currentTarget }) => {
      if (!currentTarget.complete) return;
      const hasToTransform = () => {
        const hasValue = ([, value]) => value != null;
        const hasChanged = ([key, value]) => {
          transformationRef.current?.instance?.transformState?.[key] !== value;
        };

        return Object.entries({ positionX, positionY, scale })
          .filter(hasValue)
          .some(hasChanged);
      };

      hasToTransform()
        ? setTransform(positionX, positionY, scale)
        : resetTransform();
    };
    return (
      <TransformComponent
        wrapperStyle={wrapperStyle}
        wrapperClass={wrapperClass}
      >
        <img
          src={source}
          alt={alt}
          className={hasPlaceholder() ? css.placeholder : css.image}
          onLoad={onLoad}
        ></img>
      </TransformComponent>
    );
  };

  return (
    <TransformWrapper
      panning={{ disabled: hasPlaceholder() }}
      wheel={{ disabled: hasPlaceholder(), step: 0.00375 }}
      pinch={{ disabled: hasPlaceholder() }}
      onZoomStart={onImageManipulationStart}
      onPanningStart={onImageManipulationStart}
      onZoomStop={onImageManipulationStop}
      onPanningStop={onImageManipulationStop}
      onTransform={reportChange}
      ref={transformationRef}
      centerOnInit={true}
    >
      {buildTransformComponent}
    </TransformWrapper>
  );
}

export default ImageMagnifier;
