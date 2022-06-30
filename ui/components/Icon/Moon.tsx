import { SVGProps } from "react";

const Moon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M5 13h6v2H5zM5 1h6v2H5zM3 11h6v2H3zM3 3h6v2H3zM1 9h6v2H1zM1 7h6v2H1zM1 5h6v2H1z" />
  </svg>
);

export default Moon;
