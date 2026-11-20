import { Image, View } from "@react-pdf/renderer";
import style from "./style";
import convertPxToPt from "../../convertPxToPt";

/**
 * Renders the user avatar in the pdf
 * @param {object} props The component properties
 * @param {string} props.source A path to an image
 * @param {number} [props.positionX = 0] The horizontal offset of the image relative to the left upper corner of the input wrapper
 * @param {number} [props.positionY = 0] The vertical offset of the image relative to the left upper corner of the input wrapper
 * @param {number} [props.scale = 0] The ratio of the computed size to the size defined in the styles
 * @param {number} [props.frameWidth = 0] The width of the frame that shows the image in px
 * @param {number} [props.computedWidth = 0] The computed width of the image in px
 * @param {number} [props.computedHeight = 0] The computed height of the image in px
 * @param {string} props.backgroundColor
 * @returns {JSX.Element}
 */
function Avatar({
  source,
  positionX = 0,
  positionY = 0,
  scale = 0,
  frameWidth = 0,
  computedWidth = 0,
  computedHeight = 0,
  backgroundColor,
}) {
  const factor = frameWidth
    ? style.content.width / convertPxToPt(frameWidth)
    : 1;

  return (
    <View style={{ ...style.main, backgroundColor }}>
      <View style={{ ...style.content, backgroundColor }}>
        <Image
          style={{
            ...style.image,
            height: convertPxToPt(computedHeight) * factor * scale,
            width: convertPxToPt(computedWidth) * factor * scale,
            left: convertPxToPt(positionX) * factor,
            top: convertPxToPt(positionY) * factor,
          }}
          source={source}
        ></Image>
      </View>
    </View>
  );
}

export default Avatar;
