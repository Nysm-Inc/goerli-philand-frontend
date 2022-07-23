import { FC, ReactNode, useContext } from "react";
import { Tab as ChakraTab, TabList as ChakraTabList, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Tab: FC<{ text: string }> = ({ text }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraTab
      w="128px"
      textStyle="label-1"
      borderRadius="4px"
      textColor="grey.500"
      _selected={{
        color: colorMode === "light" ? "white" : "grey.900",
        bgColor: colorMode === "light" ? "grey.900" : "white",
        textColor: colorMode === "light" ? "white" : "grey.900",
      }}
    >
      <Text textStyle="label-1">{text}</Text>
    </ChakraTab>
  );
};

const TabList: FC<{ children: ReactNode }> = ({ children }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraTabList
      width="it-content"
      margin="0 auto"
      h="36px"
      borderRadius="8px"
      display="inline-flex"
      justifyContent="center"
      border="1px solid"
      borderColor={colorMode === "light" ? "grey.200" : "dark.grey700"}
    >
      {children}
    </ChakraTabList>
  );
};

export { Tab, TabList };
