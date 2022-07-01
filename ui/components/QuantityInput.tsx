import { FC, useContext } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";

const QuantityInput: FC<{
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ num, balance, handleClickPlus, handleClickMinus }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Flex
      w="144px"
      h="32px"
      p="8px 16px"
      justify="space-between"
      align="center"
      borderRadius="12px"
      bgColor={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
    >
      <Button variant="unstyled" display="flex" justifyContent="left" disabled={num <= 0} onClick={handleClickMinus}>
        <Icon name="minus" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />
      </Button>
      <Text textStyle="label-1" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
        {num}
      </Text>
      <Button variant="unstyled" display="flex" justifyContent="right" disabled={balance <= num} onClick={handleClickPlus}>
        <Icon name="plus" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />
      </Button>
    </Flex>
  );
};

export default QuantityInput;
