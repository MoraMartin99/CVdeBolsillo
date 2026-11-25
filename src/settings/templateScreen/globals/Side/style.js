import { StyleSheet } from "@react-pdf/renderer";
import convertPxToPt from "../convertPxToPt";

const style = StyleSheet.create({
  main: {
    width: convertPxToPt(250),
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingVertical: convertPxToPt(40),
    alignItems: "center",
    gap: convertPxToPt(46.5),
  },
});

export default style;
