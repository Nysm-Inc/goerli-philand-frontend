import { FC } from "react";
import { Center, Text } from "@chakra-ui/react";

const NewBadge: FC = () => (
  <Center w="41px" h="24px" p="4px 8px" borderRadius="8px" bgColor="green.350">
    <Text textStyle="label-1" color="white">
      New
    </Text>
  </Center>
);

export default NewBadge;
