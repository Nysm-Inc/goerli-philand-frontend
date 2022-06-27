import { FC } from "react";
import { Menu, MenuButton, LayoutProps, Box } from "@chakra-ui/react";
import MenuList, { Option } from "./MenuList";
import Button from "./Button";
import Image from "next/image";

const SelectBox: FC<{
  w: LayoutProps["w"];
  options: Option[];
  value: string;
  handleChange: (value: string) => void;
}> = ({ w, options, value, handleChange }) => {
  return (
    <Menu matchWidth variant="unstyled" autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            w={w}
            rightIcon={<Image src={`/icons/${isOpen ? "dropdown-active" : "dropdown"}.svg`} width="16px" height="16px" />}
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
