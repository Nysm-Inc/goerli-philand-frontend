import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { Link, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import useClouds from "~/hooks/game/useClouds";

export const getStaticProps: GetStaticProps = async () => {
  return { props: { title: "404 | Phi" } };
};

const Custom404: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });
  useClouds(isMobile);

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
        h="440px"
        p="32px"
        spacing="32px"
        bgColor="white"
        border="1px solid"
        borderColor="light.g_orange"
        borderRadius="32px"
      >
        <Image src="/assets/phi404.png" width="192px" height="216px" alt="" />
        <VStack spacing="16px">
          <Text textStyle="headline-1" color="grey.900">
            Page Not found
          </Text>
          <Text textStyle="paragraph-1" color="grey.500">
            The requested URL was not found on the server.
          </Text>
          <Link color="primary.500" textStyle="paragraph-1" href="/">
            Back to Home
          </Link>
        </VStack>
      </VStack>
    </>
  );
};

export default Custom404;
