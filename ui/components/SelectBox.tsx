import { FC, useContext } from "react";
import { Menu, MenuButton, LayoutProps, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import MenuList, { Option } from "./MenuList";
import Button from "./Button";
import Icon from "./Icon";

const SelectBox: FC<{
  w: LayoutProps["w"];
  menuW?: LayoutProps["w"];
  options: Option[];
  selected: Option;
  disabled?: boolean;
  handleChange: (value: string) => void;
}> = ({ w, menuW, options, selected, disabled, handleChange }) => {
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
                color={disabled ? (colorMode === "light" ? "dark.grey300" : "dark.grey600") : colorMode === "light" ? "grey.900" : "white"}
              />
            }
            disabled={disabled}
          >
            <Text
              textStyle="button-2"
              textAlign="left"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              color={disabled ? (colorMode === "light" ? "dark.grey300" : "dark.grey600") : colorMode === "light" ? "grey.900" : "white"}
            >
              {selected.label}
            </Text>
          </MenuButton>

          <MenuList w={menuW || w} value={selected.value} options={options} onClick={handleChange} />
        </>
      )}
    </Menu>
  );
};

export default SelectBox;
