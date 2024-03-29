import { FC, useContext, useState } from "react";
import { HStack, Modal, ModalContent } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./common/IconButton";

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
        borderRadius="20px"
        boxShadow={colorMode === "light" ? "-2px 4px 8px rgba(13, 13, 13, 0.1)" : "4px 4px 0px rgba(26, 26, 26, 0.15);"}
        border={colorMode === "light" ? "1px solid" : "none"}
        borderColor="light.g_orange"
        bgColor={colorMode === "light" ? "white" : "grey.900"}
        left={state.x}
        top={state.y - 64 * 2}
      >
        <HStack spacing="8px">
          <IconButton
            ariaLabel="arrows"
            icon={<Icon name="arrows" color={colorMode === "light" ? "grey.900" : "white"} />}
            boxShadow={false}
            onClick={() => {
              onClickMove();
              onClose();
            }}
          />
          <IconButton
            ariaLabel="link"
            icon={<Icon name="link" color={colorMode === "light" ? "grey.900" : "white"} />}
            boxShadow={false}
            onClick={() => {
              onClickLink();
              onClose();
            }}
          />
          <IconButton
            ariaLabel="trash"
            icon={<Icon name="trash" color={colorMode === "light" ? "grey.900" : "white"} />}
            boxShadow={false}
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
