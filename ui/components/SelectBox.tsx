import { FC, useContext } from "react";
import { Menu, MenuButton, LayoutProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import MenuList, { Option } from "./MenuList";
import Button from "./Button";
import Icon from "./Icon";

const SelectBox: FC<{
  w: LayoutProps["w"];
  menuW?: LayoutProps["w"];
  options: Option[];
  selected: Option;
  handleChange: (value: string) => void;
}> = ({ w, menuW, options, selected, handleChange }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Menu matchWidth={!menuW} variant="unstyled" autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            w={w}
            rightIcon={
              <Icon
                name="dropdown"
                transform={isOpen ? "rotate(0)" : "rotate(180)"}
                color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
              />
            }
          >
            {selected.label}
          </MenuButton>

          <MenuList w={menuW || w} value={selected.value} isOpen={isOpen} options={options} onClick={handleChange} />
        </>
      )}
    </Menu>
  );
};

export default SelectBox;
