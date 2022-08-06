import { SVGProps } from "react";

const ArrowTwoWay = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 5h2v2h2v2h2v2h-2v2h-2v2h-2v-4h-6V9h6V5ZM8 9H6v2H4v2H2v2h2v2h2v2h2v-4h6v-2H8V9Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default ArrowTwoWay;
