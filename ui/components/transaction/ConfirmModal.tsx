import { FC, useContext, useMemo } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Message from "~/ui/components/Message";
import { Spinner } from "~/ui/components/Animation";
import { Modal, ModalHeader } from "~/ui/components/common/Modal";

const ConfirmModal: FC = () => {
  const { txs, colorMode } = useContext(AppContext);
  const isOpen = useMemo(() => {
    return Object.values(txs).some((tx) => tx.tmpStatus === "loading");
  }, [txs]);

  return (
    <Modal w="528px" h="352px" isOpen={isOpen} onClose={() => {}} overlay>
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
