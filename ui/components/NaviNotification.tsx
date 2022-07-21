import { FC, useCallback, useContext } from "react";
import { Flex, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { ColorMode } from "~/ui/styles";
import Button from "./Button";
import IconButton from "./IconButton";
import Icon from "./Icon";

const NaviNotification: FC<{ text: string; btnText: string; colorMode: ColorMode; onClick: () => void; onClose: () => void }> = ({
  text,
  btnText,
  colorMode,
  onClick,
  onClose,
}) => {
  return (
    <Flex
      align="center"
      p="16px"
      gap="8px"
      w="528px"
      h="64px"
      borderRadius="20px"
      border="1px solid"
      borderColor={colorMode === "light" ? "#292929" : "#F5F2EB"}
      bgColor={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
      boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);"
    >
      <Text w="294px" h="20px" textStyle="paragraph-2" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
        {text}
      </Text>
      <Button
        w="146px"
        h="32px"
        color="purple"
        onClick={() => {
          onClick();
          onClose();
        }}
      >
        <Text textStyle="button-2" color="#1A1A1A">
          {btnText}
        </Text>
      </Button>
      <IconButton
        ariaLabel="close"
        icon={<Icon name="close" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} />}
        size={32}
        flipColor
        onClick={onClose}
      />
    </Flex>
  );
};

const options = (text: string, btnText: string, onClick: () => void, colorMode: ColorMode): UseToastOptions => ({
  position: "top",
  duration: 5000,
  isClosable: true,
  render: (props) => (
    <NaviNotification text={text} btnText={btnText} colorMode={colorMode} onClick={onClick} onClose={() => props.onClose()} />
  ),
});

const useNavi = () => {
  const { colorMode } = useContext(AppContext);
  const toast = useToast();

  return useCallback(
    (text: string, btnText: string, onClick: () => void) => {
      toast(options(text, btnText, onClick, colorMode));
    },
    [colorMode]
  );
};

export default useNavi;
