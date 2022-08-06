import Image from "next/image";
import { FC, useContext } from "react";
import { Text, LayoutProps, VStack, Center, Box } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Badge from "./Badge";

const LandNotFound: FC<{ ens?: string; w?: LayoutProps["w"]; h?: LayoutProps["h"] }> = ({ ens, w, h }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      margin="auto"
      zIndex="default"
      p="32px"
      spacing="24px"
      w={w || "512px"}
      h={h || "368px"}
      bgColor="white"
      border="1px solid"
      borderColor="light.g_orange"
      borderRadius="32px"
    >
      <Center w="192px" h="192px" position="relative">
        <Image src="/icons/ENShold.png" width="96px" height="96px" />
        {ens && (
          <Box position="absolute" bottom="0">
            <Badge text={ens} />
          </Box>
        )}
      </Center>
      <VStack spacing="8px">
        <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
          No land yet
        </Text>
        <Text textStyle="paragraph-1" color="grey.500" textAlign="center">
          The land is not yet ready in this ENS.
        </Text>
      </VStack>
    </VStack>
  );
};

export default LandNotFound;
