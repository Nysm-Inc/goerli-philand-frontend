import { Center, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { AppContext } from "~/contexts";

const Badge: FC<{ text: string }> = ({ text }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Center display="inline-block" p="4px 8px" h="24px" borderRadius="8px" bgColor={colorMode === "light" ? "dark.grey800" : "grey.200"}>
      <Text textStyle="label-2" color={colorMode === "light" ? "white" : "grey.900"}>
        {text}
      </Text>
    </Center>
  );
};

export default Badge;
