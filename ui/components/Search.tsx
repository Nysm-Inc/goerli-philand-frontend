import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LayoutProps, Menu, MenuButton, Text, Box, useBoolean } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { isValid } from "~/utils/ens";
import Input from "./Input";
import Icon from "./Icon";
import { UTILS_API_GATEWAY } from "~/constants";
import MenuList, { Option } from "./MenuList";

type SearchResponse = {
  name: {
    id: string;
    name: string;
    sender: string;
  }[];
  scrollId: string;
};

const search = async (name: string): Promise<SearchResponse> => {
  const url = new URL(UTILS_API_GATEWAY + "/search");
  url.searchParams.append("name", name);

  const res = await axios.get<SearchResponse>(url.toString());
  return res.data;
};

const noOption: Option = { label: "No Options", value: "" };

const onSubmit = (text: string) => (window.location.href = isValid(text) ? text : text + ".eth");

const Search: FC<{ w?: LayoutProps["w"]; shadow?: boolean }> = ({ w, shadow = true }) => {
  const { colorMode } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [suggestOptions, setSuggestOptions] = useState<Option[]>([]);
  const [focused, { on: onFocus, off: offFocus }] = useBoolean();

  useEffect(() => {
    if (!searchText) return;

    search(searchText).then((res) => {
      setSuggestOptions(res.name.map((name) => ({ label: name.name, value: name.name })));
    });
  }, [searchText]);

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
        onFocus={onFocus}
        onBlur={offFocus}
      />

      <Menu
        //
        variant="unstyled"
        placement="bottom"
        matchWidth
        autoSelect={false}
        isOpen={focused}
      >
        <MenuButton as={Box} />
        <MenuList
          //
          w="218px"
          isOpen
          options={suggestOptions.length > 0 ? suggestOptions : [noOption]}
          onFocus={onFocus}
          onClick={onSubmit}
        />
      </Menu>
    </form>
  );
};

export default Search;
