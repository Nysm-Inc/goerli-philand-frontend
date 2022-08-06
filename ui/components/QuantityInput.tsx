import { FC } from "react";
import { Button, Center, Flex, LayoutProps, Text } from "@chakra-ui/react";
import Icon from "./Icon";

const QuantityInput: FC<{
  w?: LayoutProps["w"];
  defaultText: string;
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ w, defaultText, num, balance, handleClickPlus, handleClickMinus }) => (
  <>
    {num > 0 ? (
      <Flex w={w || "144px"} h="32px" p="2px" gap="16px" justify="space-between" align="center" borderRadius="12px" bgColor="primary.500">
        <Button
          variant="unstyled"
          minW="28px"
          maxW="28px"
          minH="28px"
          maxH="28px"
          onClick={handleClickMinus}
          _hover={{
            bgColor: "primary.600",
            borderRadius: "10px",
          }}
        >
          <Center>
            <Icon name="minus" color="white" />
          </Center>
        </Button>
        <Text textStyle="label-1" fontWeight="bold" color="white">
          {num}
        </Text>
        <Button
          variant="unstyled"
          minW="28px"
          maxW="28px"
          minH="28px"
          maxH="28px"
          disabled={balance <= num}
          onClick={handleClickPlus}
          _hover={{
            bgColor: "primary.600",
            borderRadius: "10px",
          }}
        >
          <Center>
            <Icon name="plus" color="white" />
          </Center>
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
