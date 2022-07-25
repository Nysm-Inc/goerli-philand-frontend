import { SVGProps } from "react";

const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill={props.color || "#1A1A1A"} d="M2 2h12v2H2zM0 6h16v2H0z" />
    <path fill={props.color || "#1A1A1A"} d="M0 2h2v14H0zM4 0h2v4H4zM10 0h2v4h-2zM14 2h2v14h-2zM2 14h12v2H2z" />
  </svg>
);

export default Calendar;
