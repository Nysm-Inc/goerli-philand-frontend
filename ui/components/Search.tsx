import { useState } from "react";
import { HStack, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = searchText.match(/^.+\.eth$/g) ? searchText : searchText + ".eth";
      }}
    >
      <InputGroup w="280px" h="40px" border="1px solid" borderColor="black" borderRadius="none" bgColor="white">
        <Input
          variant="unstyled"
          placeholder="visit other lands"
          paddingLeft="8px"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <InputRightElement>
          <HStack pr="12">
            <Text>.eth</Text>
          </HStack>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default Search;
