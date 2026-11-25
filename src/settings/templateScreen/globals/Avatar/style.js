import { StyleSheet } from "@react-pdf/renderer";
import convertPxToPt from "../convertPxToPt";

const mainSize = convertPxToPt(190);
const contentSizeDelta = convertPxToPt(10);
const contentSize = mainSize - contentSizeDelta;

const style = StyleSheet.create({
  main: {
    width: mainSize,
    height: mainSize,
    borderRadius: mainSize / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: contentSize,
    height: contentSize,
    overflow: "hidden",
    position: "relative",
    borderRadius: contentSize * 0.5,
  },
  image: {
    position: "absolute",
  },
});

export default style;
