import { FC, useContext } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";

const Size: FC<{ sizeX: number; sizeY: number }> = ({ sizeX, sizeY }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack w="50px" h="24px" spacing="4px" p="4px" borderRadius="4px" bgColor={colorMode === "light" ? "grey.100" : "dark.grey700"}>
      <Icon name="expand" color={colorMode === "light" ? "dark.grey600" : "grey.200"} />
      <Text textStyle="label-2" color={colorMode === "light" ? "dark.grey600" : "grey.200"}>
        {`${sizeX}x${sizeY}`}
      </Text>
    </HStack>
  );
};

export default Size;
