import { FC } from "react";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Icon from "./Icon";

const QuantityInput: FC<{
  defaultText: string;
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ defaultText, num, balance, handleClickPlus, handleClickMinus }) => (
  <>
    {num > 0 ? (
      <Flex w="144px" h="32px" p="8px 16px" justify="space-between" align="center" borderRadius="12px" bgColor="primary.500">
        <Button variant="unstyled" display="flex" justifyContent="left" onClick={handleClickMinus}>
          <Icon name="minus" color="white" />
        </Button>
        <Text textStyle="label-1" color="white">
          {num}
        </Text>
        <Button variant="unstyled" display="flex" justifyContent="right" disabled={balance <= num} onClick={handleClickPlus}>
          <Icon name="plus" color="white" />
        </Button>
      </Flex>
    ) : (
      <Center h="32px">
        <Text textStyle="label-1" color="primary.600" cursor="pointer" onClick={handleClickPlus}>
          {defaultText}
        </Text>
      </Center>
    )}
  </>
);

export default QuantityInput;
