import { SVGProps } from "react";

const Minus = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 7h10v2H3V7Z" fill={props.color || "#1A1A1A"} />
  </svg>
);

export default Minus;
