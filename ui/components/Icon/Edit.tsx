import { SVGProps } from "react";

const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill={props.color || "#1A1A1A"}
      d="M11 3h2v2h-2zM9 5h2v2H9zM9 1h2v2H9zM7 3h2v2H7zM5 5h2v2H5zM3 7h2v2H3zM1 9h2v6H1zM3 13h4v2H3zM7 11h2v2H7zM13 5h2v2h-2zM11 7h2v2h-2zM9 9h2v2H9z"
    />
  </svg>
);

export default Edit;
