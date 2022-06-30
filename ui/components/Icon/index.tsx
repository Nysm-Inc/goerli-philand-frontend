import { FC, SVGProps } from "react";
import Check from "./Check";
import Dropdown from "./Dropdown";
import Edit from "./Edit";
import Moon from "./Moon";
import Redo from "./Redo";
import Save from "./Save";
import Search from "./Search";
import Share from "./Share";
import Sun from "./Sun";
import Undo from "./Undo";

const icons = {
  check: Check,
  dropdown: Dropdown,
  edit: Edit,
  moon: Moon,
  redo: Redo,
  save: Save,
  search: Search,
  share: Share,
  sun: Sun,
  undo: Undo,
};

type IconName = keyof typeof icons;

const Icon: FC<{ name: IconName } & SVGProps<SVGSVGElement>> = ({ name, ...rest }) => {
  const IconComponent = icons[name];
  return <IconComponent {...rest} />;
};

export default Icon;
