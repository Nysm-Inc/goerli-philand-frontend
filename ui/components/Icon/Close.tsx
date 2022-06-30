import { SVGProps } from "react";

const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3h2v2H3V3Zm4 4H5V5h2v2Zm2 0H7v2H5v2H3v2h2v-2h2V9h2v2h2v2h2v-2h-2V9H9V7Zm2-2v2H9V5h2Zm0 0V3h2v2h-2Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Close;
