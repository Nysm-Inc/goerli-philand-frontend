import { SVGProps } from "react";

const Save = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M12 3h2v10h-2zM2 5h2v10H2zM4 13h10v2H4zM4 5h2V3H4zM7 9h2V7H7zM6 1h8v2H6z" />
  </svg>
);

export default Save;
