import { FC, useContext } from "react";
import { Tab as ChakraTab } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Tab: FC<{ text: string }> = ({ text }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraTab
      textStyle="label-1"
      borderRadius="4px"
      _selected={{ color: colorMode === "light" ? "#FFFFFF" : "#1A1A1A", bgColor: colorMode === "light" ? "#1A1A1A" : "#FFFFFF" }}
    >
      {text}
    </ChakraTab>
  );
};

export default Tab;
