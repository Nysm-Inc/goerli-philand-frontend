import { FC, useCallback, useContext, useEffect } from "react";
import { Flex, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { ColorMode } from "~/ui/styles";
import Button from "./common/Button";
import IconButton from "./common/IconButton";
import Icon from "./Icon";

const toastPositon = "top";
const toastManagerId = `chakra-toast-manager-${toastPositon}`;

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
      w="618px"
      h="64px"
      borderRadius="20px"
      border="1px solid"
      boxShadow="xl"
      borderColor={colorMode === "light" ? "dark.grey800" : "light.lg_orange40"}
      bgColor={colorMode === "light" ? "grey.900" : "white"}
    >
      <Text w="384px" h="20px" textStyle="paragraph-2" color={colorMode === "light" ? "white" : "grey.900"}>
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
        <Text textStyle="button-2" color="grey.900">
          {btnText}
        </Text>
      </Button>
      <IconButton
        ariaLabel="close"
        icon={<Icon name="close" color={colorMode === "light" ? "white" : "grey.900"} />}
        size="32px"
        flipColor
        boxShadow={false}
        onClick={onClose}
      />
    </Flex>
  );
};

const options = (text: string, btnText: string, onClick: () => void, colorMode: ColorMode): UseToastOptions => ({
  position: toastPositon,
  duration: 5000,
  isClosable: true,
  containerStyle: { margin: "8px 0 0 0" },
  render: (props) => (
    <NaviNotification text={text} btnText={btnText} colorMode={colorMode} onClick={onClick} onClose={() => props.onClose()} />
  ),
});

const useNavi = () => {
  const { colorMode } = useContext(AppContext);
  const toast = useToast();

  useEffect(() => {
    const toastManagerDomNode = document.getElementById(toastManagerId);
    if (toastManagerDomNode) toastManagerDomNode.style.padding = "72px 0 0 0";
  }, []);

  return useCallback(
    (text: string, btnText: string, onClick: () => void) => {
      toast(options(text, btnText, onClick, colorMode));
    },
    [colorMode]
  );
};

export default useNavi;
