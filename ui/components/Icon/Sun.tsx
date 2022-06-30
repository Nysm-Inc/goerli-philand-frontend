import { SVGProps } from "react";

const Sun = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill={props.color || "#1A1A1A"}
      d="M12 12h2v2h-2v-2ZM8.667 6h1.332V4H6.001v2h2.666ZM7 1v1h2V0H7v1ZM2 2h2v2H2V2ZM2 9V7H0v2h2ZM12 7.334V6H4v4h8V7.334ZM2 12h2v2H2v-2ZM7.332 10H6v2h3.998v-2H7.332ZM6.999 15v1h2v-2H7v1ZM14 7v2h2V7h-2ZM12 2h2v2h-2V2Z"
    />
  </svg>
);

export default Sun;
