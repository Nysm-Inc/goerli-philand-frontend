import { SVGProps } from "react";

const Man = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 0h4v2h2v2h2v4h-2v2h-2v2h4v2h2v2H0v-2h2v-2h4v-2H4V8H2V4h2V2h2V0Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Man;
