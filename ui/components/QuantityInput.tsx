import { FC, useContext, useState } from "react";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";

const QuantityInput: FC<{
  defaultText: string;
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ defaultText, num, balance, handleClickPlus, handleClickMinus }) => {
  const { colorMode } = useContext(AppContext);
  const [] = useState();

  return (
    <>
      {num > 0 ? (
        <Flex
          w="144px"
          h="32px"
          p="8px 16px"
          justify="space-between"
          align="center"
          borderRadius="12px"
          bgColor={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
        >
          <Button variant="unstyled" display="flex" justifyContent="left" onClick={handleClickMinus}>
            <Icon name="minus" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />
          </Button>
          <Text textStyle="label-1" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
            {num}
          </Text>
          <Button variant="unstyled" display="flex" justifyContent="right" disabled={balance <= num} onClick={handleClickPlus}>
            <Icon name="plus" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />
          </Button>
        </Flex>
      ) : (
        <Center h="32px">
          <Text textStyle="label-1" color="#8080FF" cursor="pointer" onClick={handleClickPlus}>
            {defaultText}
          </Text>
        </Center>
      )}
    </>
  );
};

export default QuantityInput;
