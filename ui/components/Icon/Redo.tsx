import { SVGProps } from "react";

const Redo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M11 2H9v4H1v7h2V8h6v4h2v-2h2V8h2V6h-2V4h-2V2Z" />
  </svg>
);

export default Redo;
