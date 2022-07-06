import { FC, useContext } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./Button";

const FooterButton: FC<{ text: string; buttonText: string; onClick: () => void }> = ({ text, buttonText, onClick }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Flex w="730px" h="64px" p="12px 16px 12px 24px" bgColor="#1A1A1A" borderRadius="16px" justify="space-between" align="center">
      <Text textStyle="headline-2" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
        {text}
      </Text>
      <Button w="90px" h="40px" onClick={onClick}>
        {buttonText}
      </Button>
    </Flex>
  );
};

export default FooterButton;
