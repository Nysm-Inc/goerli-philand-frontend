import { FC, useContext, useEffect, useState } from "react";
import { Box, LayoutProps, Menu, MenuButton, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { isValid } from "~/utils/ens";
import { search } from "~/utils/search";
import Input from "./Input";
import Icon from "./Icon";
import MenuList, { Option } from "./MenuList";

const onSubmit = (text: string) => {
  if (!text) return;

  window.location.href = isValid(text) ? text : text + ".eth";
};

const Search: FC<{ w?: LayoutProps["w"]; shadow?: boolean }> = ({ w, shadow = true }) => {
  const { colorMode } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [suggestOptions, setSuggestOptions] = useState<Option[]>([]);

  // useEffect(() => {
  //   if (!searchText) return;

  //   search(searchText).then((res) => {
  //     setSuggestOptions(res.name.map((name) => ({ label: name.name, value: name.name })));
  //   });
  // }, [searchText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchText);
      }}
    >
      <Input
        w={w || "336px"}
        placeholder="visit other lands"
        value={searchText}
        shadow={shadow}
        leftIcon={<Icon name="search" color={colorMode === "light" ? "grey.900" : "white"} />}
        rightIcon={
          <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
            .eth
          </Text>
        }
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* <Menu
        variant="unstyled"
        placement="bottom"
        matchWidth
        autoSelect={false}
        closeOnSelect={false}
        closeOnBlur={false}
        isOpen={focused && !!searchText}
      >
        <MenuButton as={Box} />
        <MenuList w={w || "336px"} isOpen options={suggestOptions.length > 0 ? suggestOptions : [{ label: "No Options", value: "" }]} onClick={onSubmit} />
      </Menu> */}
    </form>
  );
};

export default Search;
