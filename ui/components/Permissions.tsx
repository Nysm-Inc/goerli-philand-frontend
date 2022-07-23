import { FC, useContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Flex, Text, useBoolean, VStack } from "@chakra-ui/react";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { AppContext } from "~/contexts";
import Button from "./Button";
import Icon from "./Icon";
import { Modal, ModalBody, ModalHeader } from "./Modal";
import IconButton from "./IconButton";

const ApproveButton: FC<{ text: string; isApproved: boolean; onApprove: () => Promise<TransactionResponse | undefined> }> = ({
  text,
  isApproved,
  onApprove,
}) => {
  const { colorMode } = useContext(AppContext);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
      <Text textStyle="headline-2" color={isApproved ? "grey.500" : colorMode === "light" ? "grey.900" : "white"}>
        {text}
      </Text>
      <Button
        w={isApproved ? "183px" : "140px"}
        color={isApproved ? undefined : "purple"}
        onClick={() => {
          startLoading();
          onApprove()
            .then(async (res) => {
              await res?.wait();
              stopLoading();
            })
            .catch(stopLoading);
        }}
        disabled={isApproved}
        isLoading={isLoading}
        leftIcon={isApproved ? <Icon name="check" color={colorMode === "light" ? "grey.900" : "white"} /> : undefined}
      >
        <Text color="white" textStyle="button-1">
          {isApproved ? "Approved" : "Approve"}
        </Text>
      </Button>
    </Flex>
  );
};

const Permissions: FC<{
  isOpen: boolean;
  isApproved: {
    [QUEST_OBJECT_CONTRACT_ADDRESS]: boolean;
    [FREE_OBJECT_CONTRACT_ADDRESS]: boolean;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: boolean;
    [WALLPAPER_CONTRACT_ADDRESS]: boolean;
  };
  onApprove: {
    [QUEST_OBJECT_CONTRACT_ADDRESS]: () => Promise<TransactionResponse | undefined>;
    [FREE_OBJECT_CONTRACT_ADDRESS]: () => Promise<TransactionResponse | undefined>;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: () => Promise<TransactionResponse | undefined>;
    [WALLPAPER_CONTRACT_ADDRESS]: () => Promise<TransactionResponse | undefined>;
  };
  onClose: () => void;
}> = ({ isOpen, isApproved, onApprove, onClose }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="528px" h="436px" isOpen={isOpen} onClose={() => {}} overlay>
      <ModalHeader
        title="Permissions"
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size={32}
            borderRadius={8}
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
      <ModalBody>
        <VStack>
          <ApproveButton
            text="Phi Object"
            isApproved={isApproved[QUEST_OBJECT_CONTRACT_ADDRESS]}
            onApprove={onApprove[QUEST_OBJECT_CONTRACT_ADDRESS]}
          />

          <ApproveButton
            text="Free Object"
            isApproved={isApproved[FREE_OBJECT_CONTRACT_ADDRESS]}
            onApprove={onApprove[FREE_OBJECT_CONTRACT_ADDRESS]}
          />
          <ApproveButton
            text="Premium Object"
            isApproved={isApproved[PREMIUM_OBJECT_CONTRACT_ADDRESS]}
            onApprove={onApprove[PREMIUM_OBJECT_CONTRACT_ADDRESS]}
          />
          <ApproveButton
            text="Wallpaper"
            isApproved={isApproved[WALLPAPER_CONTRACT_ADDRESS]}
            onApprove={onApprove[WALLPAPER_CONTRACT_ADDRESS]}
          />
        </VStack>
      </ModalBody>
    </Modal>
  );
};

export default Permissions;
