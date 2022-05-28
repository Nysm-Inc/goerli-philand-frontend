import Image from "next/image";
import { FC, useState } from "react";
import { Box, Center, HStack, Popover, PopoverContent } from "@chakra-ui/react";

type ActionMenuState = { x: number; y: number; isShown: boolean };

const defaultState = { x: 0, y: 0, isShown: false };

export const useActionMenu = (): [ActionMenuState, (x: number, y: number) => void, () => void] => {
  const [state, setState] = useState<ActionMenuState>(defaultState);
  const onOpen = (x: number, y: number) => setState({ x, y, isShown: true });
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
  return (
    <Box position="fixed" left={state.x} top={state.y}>
      <Popover
        isOpen={state.isShown}
        onClose={() => {
          onBack();
          onClose();
        }}
      >
        <PopoverContent
          w="132px"
          h="40px"
          border="1px solid"
          borderColor="black"
          borderRadius="none"
          bgColor="white"
          _focus={{ outline: "none" }}
          _focusVisible={{ outline: "none" }}
        >
          <HStack spacing="4px">
            <Center
              w="40px"
              h="40px"
              cursor="pointer"
              onClick={() => {
                onClickMove();
                onClose();
              }}
            >
              <Image src="/icons/arrows-cardinal.svg" width="24px" height="24px" />
            </Center>
            <Center
              w="40px"
              h="40px"
              onClick={() => {
                onClickLink();
                onClose();
              }}
            >
              <Image src="/icons/link.svg" width="24px" height="24px" />
            </Center>
            <Center
              w="40px"
              h="40px"
              onClick={() => {
                onClickTrash();
                onClose();
              }}
            >
              <Image src="/icons/trash.svg" width="24px" height="24px" />
            </Center>
          </HStack>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ActionMenu;
