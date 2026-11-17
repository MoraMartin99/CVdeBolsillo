import { Svg, Path } from "@react-pdf/renderer";

export default function DiagonalArrowIcon({ style }) {
  return (
    <Svg viewBox="0 0 24 24" width={style.width} height={style.height}>
      <defs />
      <Path
        d="M9.171 14.828 14.828 9.172M14.828 9.172H9.878M14.828 9.172V14.121M12 22C17.523 22 22 17.523 22 12 22 6.477 17.523 2 12 2 6.477 2 2 6.477 2 12 2 17.523 6.477 22 12 22Z"
        stroke={style.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
