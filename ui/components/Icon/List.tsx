import { SVGProps } from "react";

const List = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 3h2v2H1V3Zm2 4H1v2h2V7Zm12 0H5v2h10V7ZM1 11h2v2H1v-2Zm14 0H5v2h10v-2Zm0-8H5v2h10V3Z"
      fill={props.color || "#1A1A1A"}
    />
  </svg>
);

export default List;
