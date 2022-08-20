import { FC, useContext } from "react";
import { Box, Button, Center, Flex, LayoutProps, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import { colors } from "~/ui/styles/color";

const fixedSize = (
  size: string
): { minW: LayoutProps["minW"]; maxW: LayoutProps["maxW"]; minH: LayoutProps["minH"]; maxH: LayoutProps["maxH"] } => {
  return { minW: size, maxW: size, minH: size, maxH: size };
};

const QuantityInput: FC<{
  w?: LayoutProps["w"];
  defaultText: string;
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ w = "144px", defaultText, num, balance, handleClickPlus, handleClickMinus }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      {num > 0 ? (
        <Flex w={w} h="32px" p="2px" gap="16px" justify="space-between" align="center" borderRadius="12px" bgColor="primary.500">
          <Button
            variant="unstyled"
            {...fixedSize("28px")}
            onClick={handleClickMinus}
            _hover={{ bgColor: "purple.350", borderRadius: "10px" }}
          >
            <Center>
              <Icon name="minus" color={colorMode === "light" ? "white" : "grey.900"} />
            </Center>
          </Button>
          <Text textStyle="button-2" fontWeight="bold" color={colorMode === "light" ? "white" : "grey.900"}>
            {num}
          </Text>
          <Button
            variant="unstyled"
            {...fixedSize("28px")}
            disabled={balance <= num}
            onClick={handleClickPlus}
            _hover={{ bgColor: "purple.350", borderRadius: "10px" }}
          >
            <Center>
              <Icon name="plus" color={colorMode === "light" ? "white" : "grey.900"} />
            </Center>
          </Button>
        </Flex>
      ) : (
        <Flex
          w={w}
          h="32px"
          p="8px"
          gap="8px"
          justify="space-between"
          align="center"
          borderRadius="12px"
          bgColor="transparent"
          border="1px solid"
          borderColor="primary.500"
          cursor="pointer"
          onClick={handleClickPlus}
          _hover={{
            bgColor: "primary.500",
            p: { color: colorMode === "light" ? "white" : "grey.900" },
            svg: { path: { fill: colorMode === "light" ? "white" : colors.grey[900] } },
          }}
        >
          <Box w="16px" />
          <Text textStyle="button-2" fontWeight="bold" color="primary.500">
            {defaultText}
          </Text>
          <Button variant="unstyled" {...fixedSize("16px")}>
            <Center>
              <Icon name="plus" color="primary.500" />
            </Center>
          </Button>
        </Flex>
      )}
    </>
  );
};

export default QuantityInput;
