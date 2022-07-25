import { SVGProps } from "react";

const Expand = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1h5v2H5v2H3v1H1V1Zm6 6H5V5h2v2Zm2 0H7v2H5v2H3v-1H1v5h5v-2H5v-2h2V9h2v2h2v2h-1v2h5v-5h-2v1h-2V9H9V7Zm2-2v2H9V5h2Zm2-4h-3v2h1v2h2v1h2V1h-2Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Expand;
