import { SVGProps } from "react";

const Refresh = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill={props.color || "#1A1A1A"}
      d="M5 13h2v2H5zM7 13h2v2H7zM9 13h2v2H9zM3 11h2v2H3zM11 11h2v2h-2zM13 9h2v2h-2zM13 7h2v2h-2zM13 5h2v2h-2zM11 3h2v2h-2zM9 1h2v2H9zM7 1h2v2H7zM5 1h2v2H5zM3 3h2v2H3zM1 1h2v2H1zM1 3h2v2H1zM1 5h2v2H1zM3 5h2v2H3zM5 5h2v2H5z"
    />
  </svg>
);

export default Refresh;
