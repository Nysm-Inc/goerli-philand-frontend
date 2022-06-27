import Image from "next/image";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Input from "./Input";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = searchText.match(/^.+\.eth$/g) ? searchText : searchText + ".eth";
      }}
    >
      <Input
        w="336px"
        placeholder="visit other lands"
        value={searchText}
        leftIcon={<Image src="/icons/search.svg" width="16px" height="16px" />}
        rightIcon={<Text>.eth</Text>}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default Search;
