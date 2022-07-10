import { SVGProps } from "react";

const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" fill={props.color || "#1A1A1A"}>
      <path d="M8.332 6h.666V4H7v2h1.332ZM8.332 12h.666V8H7v4h1.332ZM1 2h2v12H1V2ZM13 2h2v12h-2V2ZM3 0h10v2H3V0ZM3 14h10v2H3v-2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Info;
