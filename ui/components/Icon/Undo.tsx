import { SVGProps } from "react";

const Undo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} fillRule="evenodd" clipRule="evenodd" d="M5 2h2v4h8v2H7v4H5v-2H3V8H1V6h2V4h2V2Z" />
    <path fill={props.color || "#1A1A1A"} d="M15 6h-2v7h2z" />
  </svg>
);

export default Undo;
