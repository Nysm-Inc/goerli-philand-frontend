import { SVGProps } from "react";

const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" fill={props.color || "#1A1A1A"}>
      <path d="M4.333 14H5V6H3v8h1.333ZM12.334 14H13V6h-2v8h1.334ZM8.333 14H9V6H7v8h1.333ZM1 4h14v2H1V4ZM5 2h2v2H5V2ZM9 2h2v2H9V2ZM9 0h2v2H9V0ZM7 0h2v2H7V0ZM3 14h10v2H3v-2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Trash;
