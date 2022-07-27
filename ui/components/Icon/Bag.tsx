import { SVGProps } from "react";

const Bag = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0H6v2H4v4H0v8h2v2h12v-2h2V6h-4V2h-2V0Zm0 6H6V2h4v4Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default Bag;
