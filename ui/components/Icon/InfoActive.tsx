import { SVGProps } from "react";

const InfoActive = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" fill={props.color || "#1A1A1A"}>
      <path d="M1 2h2v12H1V2ZM13 2h2v12h-2V2ZM3 0h10v2H3V0ZM3 2h10v2H3V2ZM3 6h10v2H3V6ZM3 12h10v2H3v-2ZM3 4h4v2H3V4ZM3 8h4v2H3V8ZM3 10h4v2H3v-2ZM9 4h4v2H9V4ZM9 8h4v2H9V8ZM9 10h4v2H9v-2ZM3 14h10v2H3v-2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default InfoActive;
