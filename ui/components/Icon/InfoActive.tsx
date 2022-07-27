import { SVGProps } from "react";

const InfoActive = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0H4v2H2v2H0v8h2v2h2v2h8v-2h2v-2h2V4h-2V2h-2V0ZM9 12H7V8h2v4Zm0-8H7v2h2V4Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default InfoActive;
