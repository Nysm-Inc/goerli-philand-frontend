import { ColorProps, useToken } from "@chakra-ui/react";
import { FC, SVGProps } from "react";
import Alert from "./Alert";
import Arrow from "./Arrow";
import Arrows from "./Arrows";
import ArrowTwoWay from "./ArrowTwoWay";
import Bag from "./Bag";
import Calendar from "./Calendar";
import Check from "./Check";
import CheckCircle from "./CheckCircle";
import Close from "./Close";
import Dropdown from "./Dropdown";
import Edit from "./Edit";
import Expand from "./Expand";
import Help from "./Help";
import Info from "./Info";
import InfoActive from "./InfoActive";
import Link from "./Link";
import Man from "./Man";
import Menu from "./Menu";
import Minus from "./Minus";
import Moon from "./Moon";
import Plus from "./Plus";
import Redo from "./Redo";
import Refresh from "./Refresh";
import Save from "./Save";
import Search from "./Search";
import Share from "./Share";
import Sun from "./Sun";
import Timer from "./Timer";
import Trash from "./Trash";
import Undo from "./Undo";

const icons = {
  alert: Alert,
  arrow: Arrow,
  arrows: Arrows,
  arrowTwoWay: ArrowTwoWay,
  bag: Bag,
  calendar: Calendar,
  check: Check,
  checkCircle: CheckCircle,
  close: Close,
  dropdown: Dropdown,
  edit: Edit,
  expand: Expand,
  help: Help,
  info: Info,
  infoActive: InfoActive,
  link: Link,
  man: Man,
  menu: Menu,
  minus: Minus,
  moon: Moon,
  plus: Plus,
  redo: Redo,
  refresh: Refresh,
  save: Save,
  search: Search,
  share: Share,
  sun: Sun,
  timer: Timer,
  trash: Trash,
  undo: Undo,
};

export type IconName = keyof typeof icons;

const Icon: FC<SVGProps<SVGSVGElement> & { name: IconName; color?: ColorProps["color"] }> = ({ name, color = "grey.900", ...rest }) => {
  const token = useToken("colors", [color]);
  const IconComponent = icons[name];
  return <IconComponent color={token.toString()} {...rest} />;
};

export default Icon;
