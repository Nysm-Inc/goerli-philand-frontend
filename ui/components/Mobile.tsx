import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext, useEffect, useRef } from "react";
import { AppContext } from "~/contexts";
import HeaderMd from "./HeaderMd";

const Mobile: FC = () => {
  // const _strictRef = useRef(false); // for avoiding react18 strict mode
  const { game, colorMode } = useContext(AppContext);

  // useEffect(() => {
  //   if (_strictRef.current) return;
  //   _strictRef.current = true;

  //   game.engine.reset();
  // }, []);

  return (
    <Box position="relative" w="100vw" h="calc(437px + 100vw)" bgColor={colorMode == "light" ? "light.lg_orange40" : "dark.black"}>
      <HeaderMd />
      <Box position="absolute" top="161px" left="16px">
        <Image src="/icons/only_mobile.svg" width="80px" height="80px" />
      </Box>
      <VStack position="absolute" top="265px" left="16px" spacing="8px" align="flex-start">
        <Text textStyle="headline-2" color={colorMode == "light" ? "grey.900" : "white"}>
          This webpage is not available on mobile phone.
        </Text>
        <Text textStyle="paragraph-2" color="grey.500">
          For normal use, use in a desktop browser or resize to widescreen.
        </Text>
      </VStack>
      <Box position="absolute" bottom="0" w="100vw" h="100vw">
        <Image src="/assets/sample_land.svg" layout="fill" objectFit="contain" />
      </Box>
    </Box>
  );
};

export default Mobile;
