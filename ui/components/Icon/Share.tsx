import { SVGProps } from "react";

const Share = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M9 3h2v2H9zM5 3h2v2H5zM3 5h2v2H3zM7 1h2v2H7zM1 13h14v2H1zM7 3h2v8H7zM11 5h2v2h-2z" />
  </svg>
);

export default Share;
