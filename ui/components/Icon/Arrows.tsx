import { SVGProps } from "react";

const Arrows = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0h2v2h2v2H5V2h2V0ZM7 12H5v2h2v2h2v-2h2v-2H7ZM2 5h2v6H2V9H0V7h2V5ZM14 5h-2v6h2V9h2V7h-2V5Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Arrows;
