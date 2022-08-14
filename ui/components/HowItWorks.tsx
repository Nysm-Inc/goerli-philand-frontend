import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { HOW_IT_WORKS_KEY } from "~/constants";
import Icon from "./Icon";
import IconButton from "./common/IconButton";
import { Modal, ModalHeader, ModalBody } from "./common/Modal";

const HowItWorks: FC<{ isOpen: boolean; onOpen: () => void; onClose: () => void }> = ({ isOpen, onOpen, onClose }) => {
  const { colorMode } = useContext(AppContext);

  useEffect(() => {
    const onlyOnce = localStorage.getItem(HOW_IT_WORKS_KEY);
    if (!onlyOnce) {
      onOpen();
      localStorage.setItem(HOW_IT_WORKS_KEY, "true");
    }
  }, []);

  return (
    <Modal w="832px" h="652px" isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="How It Works"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            borderRadius="8px"
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
      <Box h="16px" />
      <ModalBody>
        <VStack h="532px" p="0 24px" spacing="16px" borderRadius="16px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
          <Image src={`/assets/howItWorks_${colorMode}.png`} width="800px" height="400px" alt="" />
          <VStack w="736px" spacing="0px" align="flex-start">
            <Text textStyle="paragraph-1" color="grey.500">
              You can purchase objects from the shop or claim objects from quests.
            </Text>
            <Text textStyle="paragraph-1" color="grey.500">
              Objects that are claimed or purchased will show up in your wallet.
            </Text>
            <Text textStyle="paragraph-1" color="grey.500">
              Then in your wallet you can click ‘deposit’ on objects to start decorating your land.
            </Text>
          </VStack>
        </VStack>
      </ModalBody>
    </Modal>
  );
};

export default HowItWorks;
