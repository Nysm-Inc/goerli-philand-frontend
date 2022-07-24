import { FC, useContext } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { Tx } from "~/types/tx";
import { AppContext } from "~/contexts";
import { Modal, ModalHeader, Message } from "~/ui/components";
import { Spinner } from "~/ui/components/Animation";

const ConfirmTx: FC<{ txs: Tx[] }> = ({ txs }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="528px" h="380px" isOpen={txs.some((tx) => tx.tmpStatus === "loading")} onClose={() => {}} overlay>
      <ModalHeader title="CONFIRMATION" buttons={[]} />
      <VStack spacing="16px">
        <Spinner size="96px" />
        <Text textStyle="headline-1" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
          WAITING FOR CONFIRMATION
        </Text>
        <Text color="grey.500" textStyle="paragraph-2" textAlign="center">
          Description Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts
          and visual mockups.
        </Text>
        <Message color="warning" text="Comfirm this transaction in your wallet" />
      </VStack>
    </Modal>
  );
};

export default ConfirmTx;
