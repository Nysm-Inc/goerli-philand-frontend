import { SVGProps } from "react";

const Center = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 7H7v2h2V7Z" fill={props.color || "#1A1A1A"} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 1h2v2h4v4h2v2h-2v4H9v2H7v-2H3V9H1V7h2V3h4V1Zm4 10V5H5v6h6Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Center;
