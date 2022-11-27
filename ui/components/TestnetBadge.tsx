import { FC } from "react";
import { Center, Text } from "@chakra-ui/react";
import Icon from "./Icon";

const TestnetBadge: FC = () => (
  <Center
    zIndex="default"
    position="fixed"
    left="-24px"
    top="50%"
    transform="rotate(-90deg) translateY(-50%)"
    w="110px"
    h="32px"
    p="8px 16px"
    gap="4px"
    bgColor="#3496E5"
    borderRadius="0px 0px 8px 8px"
  >
    <Icon name="science" color="white" />
    <Text textStyle="button-2" color="white">
      Testnet
    </Text>
  </Center>
);

export default TestnetBadge;
