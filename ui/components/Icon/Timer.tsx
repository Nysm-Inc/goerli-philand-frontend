import { SVGProps } from "react";

const Timer = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0H4v2H2v2H0v8h2v2h2v2h8v-2h2v-2h2V4h-2V2h-2V0Zm0 2v2h2v8h-2v2H4v-2H2V4h2V2h8Z"
      fill={props.color || "#1A1A1A"}
    />
    <path d="M9 4H7v6h4V8H9V4Z" fill={props.color || "#1A1A1A"} />
  </svg>
);

export default Timer;
