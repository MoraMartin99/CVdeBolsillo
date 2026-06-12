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
 * @param {number} data.wrapperWidth The magnitud of the computed width of the wrapper component in px
 * @param {number} data.wrapperHeight The magnitud of the computed height of the wrapper component in px
 * @param {number} data.contentWidth The magnitud of the computed width of the content component in px
 * @param {number} data.contentHeight The magnitud of the computed height of the content component in px
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

  const reportChange = ({
    state: { scale, positionX, positionY },
    instance: { wrapperComponent, contentComponent },
  }) => {
    const [wrapperWidth, wrapperHeight] = getComputedSize(wrapperComponent);
    const [contentWidth, contentHeight] = getComputedSize(contentComponent);
    onChange({
      source,
      positionX,
      positionY,
      scale,
      wrapperWidth,
      wrapperHeight,
      contentWidth,
      contentHeight,
    });
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
      onZoomStop={hasPlaceholder() ? undefined : reportChange}
      onPanningStop={hasPlaceholder() ? undefined : reportChange}
      ref={transformationRef}
      centerOnInit={true}
    >
      {buildTransformComponent}
    </TransformWrapper>
  );
}

export default ImageMagnifier;
