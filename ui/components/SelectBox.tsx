import { FC, useContext } from "react";
import { Menu, MenuButton, LayoutProps } from "@chakra-ui/react";
import MenuList, { Option } from "./MenuList";
import Button from "./Button";
import Icon from "./Icon";
import { AppContext } from "~/contexts";

const SelectBox: FC<{
  w: LayoutProps["w"];
  options: Option[];
  value: string;
  handleChange: (value: string) => void;
}> = ({ w, options, value, handleChange }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Menu matchWidth variant="unstyled" autoSelect={false}>
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
            {value}
          </MenuButton>
          <MenuList
            //
            w={w}
            value={value}
            isOpen={isOpen}
            options={options}
            onClick={(v: string) => handleChange(v)}
          />
        </>
      )}
    </Menu>
  );
};

export default SelectBox;
