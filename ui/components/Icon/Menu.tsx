import { SVGProps } from "react";

const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M14 3H2v2h12V3ZM2 7h12v2H2V7Zm0 4h12v2H2v-2Z" fill={props.color || "#1A1A1A"} />
  </svg>
);

export default Menu;
