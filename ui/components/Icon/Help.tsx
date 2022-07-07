import { SVGProps } from "react";

const Help = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M7 12h2v2H7zM11 4h2v2h-2zM3 4h2v2H3zM7 8h2v2H7zM9 6h2v2H9zM5 2h6v2H5z" />
  </svg>
);

export default Help;
