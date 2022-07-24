import { FC } from "react";
import { Center, LayoutProps, Text } from "@chakra-ui/react";
import { information } from "~/ui/styles/color";

const Message: FC<{ w?: LayoutProps["w"]; color: keyof typeof information; text: string }> = ({ w = "full", color, text }) => (
  <Center w={w} p="8px" gap="8px" h="32px" borderRadius="8px" bgColor={`${color}.subtle`}>
    <Text textStyle="label-2" color={`${color}.default`}>
      {text}
    </Text>
  </Center>
);

export default Message;
