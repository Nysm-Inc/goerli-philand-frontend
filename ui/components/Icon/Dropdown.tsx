import { SVGProps } from "react";

const Dropdown = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M3 11h10V9H3zM5 9h6V7H5zM7 7h2V5H7z" />
  </svg>
);

export default Dropdown;
