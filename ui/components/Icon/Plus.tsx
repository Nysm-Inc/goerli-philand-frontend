import { SVGProps } from "react";

const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7 3h2v4h4v2H9v4H7V9H3V7h4V3Z" fill={props.color || "#1A1A1A"} />
  </svg>
);

export default Plus;
