import { FC, useContext, useState } from "react";
import { HStack, Modal, ModalContent } from "@chakra-ui/react";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { AppContext } from "~/contexts";

export type ActionMenuState = { id: string; x: number; y: number; isShown: boolean };
export const defaultActionMenuState = { id: "", x: 0, y: 0, isShown: false };

export const useActionMenu = (): [ActionMenuState, (id: string, x: number, y: number) => void, () => void] => {
  const [state, setState] = useState<ActionMenuState>(defaultActionMenuState);
  const onOpen = (id: string, x: number, y: number) => setState({ id, x, y, isShown: true });
  const onClose = () => setState({ ...state, isShown: false });
  return [state, onOpen, onClose];
};

const ActionMenu: FC<{
  state: ActionMenuState;
  onClose: () => void;
  onBack: () => void;
  onClickMove: () => void;
  onClickLink: () => void;
  onClickTrash: () => void;
}> = ({ state, onClose, onBack, onClickMove, onClickLink, onClickTrash }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal
      isOpen={state.isShown}
      onClose={() => {
        onClose();
        onBack();
      }}
    >
      <ModalContent
        w="176px"
        h="64px"
        position="absolute"
        p="8px"
        border={colorMode === "light" ? "1px solid #CECCC9" : "none"}
        boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
        borderRadius="16px"
        bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}
        left={state.x}
        top={state.y - 64 * 2}
      >
        <HStack spacing="8px">
          <IconButton
            ariaLabel="arrows"
            icon={<Icon name="arrows" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            onClick={() => {
              onClickMove();
              onClose();
            }}
          />
          <IconButton
            ariaLabel="link"
            icon={<Icon name="link" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            onClick={() => {
              onClickLink();
              onClose();
            }}
          />
          <IconButton
            ariaLabel="trash"
            icon={<Icon name="trash" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            onClick={() => {
              onClickTrash();
              onClose();
            }}
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
};

export default ActionMenu;
