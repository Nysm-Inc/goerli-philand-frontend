import { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const QuantityInput: FC<{
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ num, balance, handleClickPlus, handleClickMinus }) => {
  return (
    <Flex w="96px" h="24px" justify="space-evenly" align="center" bgColor="gray.800" borderRadius="24px" color="white">
      <Button variant="unstyled" disabled={num <= 0} onClick={handleClickMinus} _focus={{ border: "none" }}>
        <Text fontSize="xl">-</Text>
      </Button>
      <Text fontSize="lg">{num}</Text>
      <Button variant="unstyled" disabled={balance <= num} onClick={handleClickPlus} _focus={{ border: "none" }}>
        <Text fontSize="xl">+</Text>
      </Button>
    </Flex>
  );
};

export default QuantityInput;
