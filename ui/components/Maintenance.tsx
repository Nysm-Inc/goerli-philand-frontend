import { Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import { TWITTER_URL } from "~/constants";
import { AppContext } from "~/contexts";

const Maintenance: FC = () => {
  const { game } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });

  useEffect(() => {
    if (isMobile) {
      game.engine.hideClouds();
    } else {
      game.engine.showClouds();
    }
  }, [isMobile]);

  return (
    <>
      <VStack
        position="fixed"
        top="0"
        bottom="0"
        left="0"
        right="0"
        margin="auto"
        zIndex="default"
        w={isMobile ? "320px" : "512px"}
        h="431px"
        p="32px"
        spacing="32px"
        bgColor="white"
        border="1px solid"
        borderColor="light.g_orange"
        borderRadius="32px"
      >
        <Image src="/assets/maintenance.png" width="338px" height="192px" alt="" />
        <VStack spacing="16px">
          <Text textStyle="headline-1" color="grey.900">
            Maintenance
          </Text>
          <Text textStyle="paragraph-1" color="grey.500">
            Please wait for a while until the recovery. New updates and announcements.
          </Text>
          <Link color="primary.500" textStyle="paragraph-1" href={TWITTER_URL} isExternal>
            Follow on Twitter
          </Link>
        </VStack>
      </VStack>
    </>
  );
};

export default Maintenance;
