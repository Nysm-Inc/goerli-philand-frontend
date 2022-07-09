import { SVGProps } from "react";

const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11 3H9v4H1v2h8v4h2v-2h2V9h2V7h-2V5h-2V3Z" fill={props.color || "#1A1A1A"} />
  </svg>
);

export default Arrow;
