import { FC, SVGProps } from "react";
import Alert from "./Alert";
import Arrows from "./Arrows";
import Check from "./Check";
import Close from "./Close";
import Dropdown from "./Dropdown";
import Edit from "./Edit";
import Link from "./Link";
import Minus from "./Minus";
import Moon from "./Moon";
import Plus from "./Plus";
import Redo from "./Redo";
import Refresh from "./Refresh";
import Save from "./Save";
import Search from "./Search";
import Share from "./Share";
import Sun from "./Sun";
import Trash from "./Trash";
import Undo from "./Undo";

const icons = {
  alert: Alert,
  arrows: Arrows,
  check: Check,
  close: Close,
  dropdown: Dropdown,
  edit: Edit,
  link: Link,
  minus: Minus,
  moon: Moon,
  plus: Plus,
  redo: Redo,
  refresh: Refresh,
  save: Save,
  search: Search,
  share: Share,
  sun: Sun,
  trash: Trash,
  undo: Undo,
};

type IconName = keyof typeof icons;

const Icon: FC<{ name: IconName } & SVGProps<SVGSVGElement>> = ({ name, ...rest }) => {
  const IconComponent = icons[name];
  return <IconComponent {...rest} />;
};

export default Icon;
