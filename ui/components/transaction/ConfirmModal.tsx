import { FC, useContext } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { Tx } from "~/types/tx";
import { AppContext } from "~/contexts";
import { Modal, ModalHeader, Message } from "~/ui/components";
import { Spinner } from "~/ui/components/Animation";

const ConfirmModal: FC<{ txs: Tx[] }> = ({ txs }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="528px" h="352px" isOpen={txs.some((tx) => tx.tmpStatus === "loading")} onClose={() => {}} overlay>
      <ModalHeader title="CONFIRMATION" buttons={[]} />
      <VStack mt="16px" spacing="32px">
        <Spinner size="112px" mode={colorMode} />
        <Text textStyle="headline-1" textAlign="center" color={colorMode === "light" ? "grey.900" : "white"}>
          Waiting For Confirmation
        </Text>
        <Message color="warning" text="Comfirm this transaction in your wallet" />
      </VStack>
    </Modal>
  );
};

export default ConfirmModal;
