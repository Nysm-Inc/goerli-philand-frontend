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
      textColor="#808080"
      _selected={{
        color: colorMode === "light" ? "#FFFFFF" : "#1A1A1A",
        bgColor: colorMode === "light" ? "#1A1A1A" : "#FFFFFF",
        textColor: colorMode === "light" ? "#FFFFFF" : "#1A1A1A",
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
      borderColor={colorMode === "light" ? "#CCCCCC" : "#333333"}
    >
      {children}
    </ChakraTabList>
  );
};

export { Tab, TabList };
