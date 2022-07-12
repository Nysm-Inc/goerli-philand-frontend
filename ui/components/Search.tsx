import { FC, useContext, useState } from "react";
import { LayoutProps, Text } from "@chakra-ui/react";
import Input from "./Input";
import Icon from "./Icon";
import { AppContext } from "~/contexts";

const Search: FC<{ w?: LayoutProps["w"] }> = ({ w }) => {
  const { colorMode } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = searchText.match(/^.+\.eth$/g) ? searchText : searchText + ".eth";
      }}
    >
      <Input
        w={w || "336px"}
        placeholder="visit other lands"
        value={searchText}
        leftIcon={<Icon name="search" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
        rightIcon={
          <Text textStyle="label-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
            .ETH
          </Text>
        }
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default Search;
