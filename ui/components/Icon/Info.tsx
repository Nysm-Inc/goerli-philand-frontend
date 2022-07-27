import { SVGProps } from "react";

const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.332 6h.666V4H7v2h1.332ZM8.332 12h.666V8H7v4h1.332Z" fill={props.color || "#1A1A1A"} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0h8v2H4V0ZM2 4V2h2v2H2Zm0 8H0V4h2v8Zm2 2v-2H2v2h2Zm8 0v2H4v-2h8Zm2-2v2h-2v-2h2Zm0-8h2v8h-2V4Zm0 0V2h-2v2h2Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Info;
