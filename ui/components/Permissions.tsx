import { FC, useContext } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { AppContext } from "~/contexts";
import Button from "./Button";
import Icon from "./Icon";
import { Modal, ModalBody, ModalHeader } from "./Modal";
import IconButton from "./IconButton";

const ApproveButton: FC<{ text: string; isApproved: boolean; onApprove: () => void }> = ({ text, isApproved, onApprove }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <Flex w="full" h="72px" p="16px" align="center" justify="space-between">
      <Text textStyle="headline-2" color={isApproved ? "#808080" : colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
        {text}
      </Text>
      <Button
        w={isApproved ? "183px" : "140px"}
        color={isApproved ? undefined : "purple"}
        onClick={onApprove}
        disabled={isApproved}
        leftIcon={isApproved ? <Icon name="check" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} /> : undefined}
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
    [PHI_OBJECT_CONTRACT_ADDRESS]: boolean;
    [FREE_OBJECT_CONTRACT_ADDRESS]: boolean;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: boolean;
    [WALLPAPER_CONTRACT_ADDRESS]: boolean;
  };
  onApprove: {
    [PHI_OBJECT_CONTRACT_ADDRESS]: () => void;
    [FREE_OBJECT_CONTRACT_ADDRESS]: () => void;
    [PREMIUM_OBJECT_CONTRACT_ADDRESS]: () => void;
    [WALLPAPER_CONTRACT_ADDRESS]: () => void;
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
            icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
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
            isApproved={isApproved[PHI_OBJECT_CONTRACT_ADDRESS]}
            onApprove={onApprove[PHI_OBJECT_CONTRACT_ADDRESS]}
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
