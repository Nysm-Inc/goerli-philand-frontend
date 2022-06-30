import { SVGProps } from "react";

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill={props.color || "#1A1A1A"}
      d="M7.667 3H9V1H5v2h2.667ZM11 7.667V9h2V5h-2v2.667ZM11 11v2h2v-2h-2ZM9 9v2h2V9H9ZM3 3v2h2V3H3ZM3 9v2h2V9H3ZM9 3v2h2V3H9ZM12.999 13v2h2v-2h-2ZM6.333 11H5v2h4v-2H6.333ZM3 6.333V5H1v4h2V6.333Z"
    />
  </svg>
);

export default Search;
