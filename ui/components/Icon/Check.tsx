import { SVGProps } from "react";

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill={props.color || "#1A1A1A"}
      d="M3 9.004h2v2H3v-2ZM1 6.996h2v2H1v-2ZM11 5h2v2h-2V5ZM8.999 6.996h2v2h-2v-2ZM7 9.004h2v2H7v-2ZM5 11h2v2H5v-2ZM13 3h2v2h-2V3Z"
    />
  </svg>
);

export default Check;
