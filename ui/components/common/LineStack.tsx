import { FC, useContext } from "react";
import { Box, LayoutProps, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Line: FC = () => {
  const { colorMode } = useContext(AppContext);
  return (
    <Box w="full" height="2px" bgColor={colorMode === "light" ? "light.g_orange" : "grey.500"} transform="matrix(1, 0, 0, -1, 0, 0)" />
  );
};
const LineStack: FC<{ w?: LayoutProps["w"] }> = ({ w }) => (
  <VStack w={w || "full"} spacing="3px">
    <Line />
    <Line />
    <Line />
  </VStack>
);

export default LineStack;
