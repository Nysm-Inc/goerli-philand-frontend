import { FC, useContext, useState } from "react";
import { LayoutProps, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { isValid } from "~/utils/ens";
import Input from "./Input";
import Icon from "./Icon";

const Search: FC<{ w?: LayoutProps["w"] }> = ({ w }) => {
  const { colorMode } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = isValid(searchText) ? searchText : searchText + ".eth";
      }}
    >
      <Input
        w={w || "336px"}
        placeholder="visit other lands"
        value={searchText}
        leftIcon={<Icon name="search" color={colorMode === "light" ? "grey.900" : "white"} />}
        rightIcon={
          <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
            .eth
          </Text>
        }
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default Search;
