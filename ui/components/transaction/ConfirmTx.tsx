import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Tx } from "~/types/wagmi";
import { Modal, ModalHeader } from "~/ui/components";
import { AppContext } from "~/contexts";

const ConfirmTx: FC<{ txs: Tx[] }> = ({ txs }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Modal w="456px" h="532px" isOpen={txs.some((tx) => tx.tmpStatus === "loading")} onClose={() => {}} overlay>
      <ModalHeader buttons={[]} />
      <VStack spacing="16px">
        <Image src={`/icons/${colorMode === "light" ? "loader" : "loader_dark"}.svg`} width="144px" height="144px" />
        <Box h="8px" />
        <Text color="white" textStyle="headline" textAlign="center">
          WAITING FOR CONFIRMATION
        </Text>
        <Text color="#808080" textStyle="paragraph-2" textAlign="center">
          Confirm this transaction in your wallet
        </Text>
      </VStack>
    </Modal>
  );
};

export default ConfirmTx;
