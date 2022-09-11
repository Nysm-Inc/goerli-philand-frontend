import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Box, LayoutProps, Menu, MenuButton, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { FocusLock } from "@chakra-ui/focus-lock";
import { AppContext } from "~/contexts";
import { isValid } from "~/utils/ens";
import { search } from "~/utils/search";
import Input from "./common/Input";
import Icon from "./Icon";
import MenuList, { Option } from "./common/MenuList";

const Search: FC<{ w?: LayoutProps["w"]; shadow?: boolean }> = ({ w, shadow = true }) => {
  const router = useRouter();
  const { colorMode } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [suggestOptions, setSuggestOptions] = useState<Option[]>([]);
  const ref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = useCallback(
    (text: string) => {
      router.push(isValid(text) ? text : text + ".eth", undefined, { shallow: true });
      setSearchText("");
    },
    [router]
  );

  useOutsideClick({ ref: ref, handler: onClose });

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
      <FocusLock autoFocus={false} isDisabled={!searchText}>
        <Input
          innerRef={ref}
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
          onClick={onOpen}
        />
      </FocusLock>

      <Menu
        variant="unstyled"
        placement="bottom"
        autoSelect={false}
        closeOnSelect={false}
        closeOnBlur={false}
        isOpen={isOpen && !!searchText}
      >
        <MenuButton as={Box} />
        <MenuList
          w={w || "336px"}
          maxH="210px"
          options={suggestOptions.length > 0 ? suggestOptions : [{ label: "No Options", value: "" }]}
          onClick={onSubmit}
        />
      </Menu>
    </form>
  );
};

export default Search;
