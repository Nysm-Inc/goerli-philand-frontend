import Image from "next/image";
import { FC, useContext } from "react";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import useENSAvatar from "~/hooks/ens/useENSAvatar";

const LandName: FC<{ ens: string }> = ({ ens }) => {
  const { colorMode } = useContext(AppContext);
  const avatar = useENSAvatar(ens);

  return (
    <HStack
      zIndex="default"
      position="fixed"
      bottom="24px"
      left="50%"
      transform="translateX(-50%)"
      maxW="320px"
      h="40px"
      p="4px 12px 4px 4px"
      spacing="8px"
      boxShadow="md"
      borderRadius="52px"
      border="1px solid"
      bgColor={colorMode === "light" ? "grey.900" : "white"}
      borderColor={colorMode === "light" ? "dark.grey800" : "grey.200"}
    >
      <Avatar
        w="32px"
        h="32px"
        src={avatar}
        {...(!avatar && { bgColor: colorMode === "light" ? "purple.150" : "red.150" })}
        icon={
          <Box position="absolute" top="4px">
            <Image width="28px" height="28px" src="/icons/dotty.svg" alt="" />
          </Box>
        }
      />
      <Text
        textStyle="button-2"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        color={colorMode === "light" ? "white" : "grey.900"}
      >
        {ens}
      </Text>
    </HStack>
  );
};

export default LandName;
