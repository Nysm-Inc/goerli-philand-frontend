import { SVGProps } from "react";

const Alert = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M7 1h2v2H7zM7 3h2v2H7zM7 5h2v2H7zM7 7h2v2H7zM7 9h2v2H7zM7 13h2v2H7z" />
  </svg>
);

export default Alert;
