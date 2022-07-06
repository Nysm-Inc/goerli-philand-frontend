import { SVGProps } from "react";

const Link = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.333 11H9V5H7v6h1.333ZM5 0h6v2H5V0ZM11 2h2v5h-2V2ZM3 2h2v5H3V2ZM3 9h2v5H3V9ZM11 9h2v5h-2V9ZM5 14h6v2H5v-2Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Link;
