import type { NextPage } from "next";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Modal,
  ModalContent,
  useDisclosure,
  Center,
  Flex,
  HStack,
  Popover,
  PopoverContent,
} from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import GameUI from "~/ui/GameUI";

const Index: NextPage = () => {
  // memo: avoid react strict mode (for dev)
  const loadedRef = useRef(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  // todo: components&hooks
  const [actionMenuState, setActionMenuState] = useState({ globalX: 0, globalY: 0, isShown: false });

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    (async () => {
      const { room } = await import("~/game/GameInstance").then((instance) => instance.default.get());
      room.roomItemManager.loadItems([
        { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, xStart: 0, yStart: 0, xEnd: 1, yEnd: 1 },
        { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2, xStart: 3, yStart: 4, xEnd: 4, yEnd: 5 },
        { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 3, xStart: 10, yStart: 10, xEnd: 12, yEnd: 12 },
        { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 4, xStart: 12, yStart: 6, xEnd: 14, yEnd: 9 },
      ]);
    })();
  }, []);

  const onOpenActionMenu = useCallback((globalX: number, globalY: number) => {
    setActionMenuState({ globalX, globalY, isShown: true });
  }, []);
  const onCloseActionMenu = useCallback(async () => {
    // const { room } = await import("~/game/GameInstance").then((instance) => instance.default.get());
    // room.movingItemManager.drop();
    setActionMenuState((prev) => {
      return { ...prev, isShown: false };
    });
  }, []);
  const onMoveObject = useCallback(async () => {
    const { room } = await import("~/game/GameInstance").then((instance) => instance.default.get());
    room.movingItemManager.move();
  }, []);
  const editMode = useCallback(async () => {
    const { room } = await import("~/game/GameInstance").then((instance) => instance.default.get());
    room.showIsoGrid();
    setIsEdit(true);
  }, []);
  const viewMode = useCallback(async () => {
    const { room } = await import("~/game/GameInstance").then((instance) => instance.default.get());
    room.hideIsoGrid();
    setIsEdit(false);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalContent border="2px solid" borderColor="black" borderRadius="none">
          <Center h="480px">
            <></>
          </Center>
        </ModalContent>
      </Modal>

      <Box position="fixed" top={actionMenuState.globalY} left={actionMenuState.globalX}>
        <Popover
          isOpen={actionMenuState.isShown}
          onClose={() => setActionMenuState({ ...actionMenuState, isShown: false })}
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
                  onMoveObject();
                  onCloseActionMenu();
                }}
              >
                <Image src="/icons/arrows-cardinal.svg" width="24px" height="24px" />
              </Center>
              <Center w="40px" h="40px" onClick={() => {}}>
                <Image src="/icons/link.svg" width="24px" height="24px" />
              </Center>
              <Center w="40px" h="40px" onClick={() => {}}>
                <Image src="/icons/trash.svg" width="24px" height="24px" />
              </Center>
            </HStack>
          </PopoverContent>
        </Popover>
      </Box>

      <HStack position="fixed" height="64px">
        <Image src="/logo.png" width="64px" height="64px" />
        <Box w="280px" h="40px" border="1px solid" borderColor="black" />
      </HStack>
      <Flex position="fixed" right="0" mr="10px" h="64px" align="center">
        <Box w="144px" h="40px" border="1px solid" borderColor="black" />
      </Flex>

      <Flex position="fixed" bottom="0" ml="10px" h="64px" align="center">
        <Box w="144px" h="40px" border="1px solid" borderColor="black" />
      </Flex>
      <HStack position="fixed" bottom="0" left="calc(50% - 120px / 2)" spacing="16px" h="64px" align="center">
        <Center
          w="40px"
          h="40px"
          border="1px solid"
          borderColor="black"
          bgColor="white"
          cursor="pointer"
          onClick={onOpen}
        >
          <Image src="/icons/collection.svg" width="32px" height="32px" />
        </Center>
        <Center
          w="40px"
          h="40px"
          border="1px solid"
          borderColor="black"
          bgColor="white"
          cursor="pointer"
          onClick={onOpen}
        >
          <Image src="/icons/sword.svg" width="32px" height="32px" />
        </Center>
        <Center
          w="40px"
          h="40px"
          border="1px solid"
          borderColor="black"
          bgColor="white"
          cursor="pointer"
          onClick={onOpen}
        >
          <Image src="/icons/store.svg" width="32px" height="32px" />
        </Center>
      </HStack>
      <Flex
        position="fixed"
        bottom="0"
        right="0"
        mr="10px"
        w="calc(40px + 40px + 16px)"
        h="64px"
        align="center"
        justify="space-between"
      >
        <Center
          w="40px"
          h="40px"
          border="1px solid"
          borderColor="black"
          bgColor="white"
          cursor="pointer"
          onClick={isEdit ? viewMode : editMode}
        >
          <Image src={`/icons/${isEdit ? "disk" : "pencil"}.svg`} width="32px" height="32px" />
        </Center>
        <Box w="40px" h="40px" border="1px solid" borderColor="black" />
      </Flex>

      <GameUI onOpenActionMenu={onOpenActionMenu} />
    </>
  );
};

export default Index;
