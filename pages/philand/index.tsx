import type { NextPage } from "next";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Box, Center, Flex, HStack, useDisclosure, useBoolean } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import Inventry from "~/ui/features/inventry";
import Collection from "~/ui/features/collection";
import ActionMenu, { useActionMenu } from "~/ui/components/ActionMenu";

const Index: NextPage = () => {
  const loadedRef = useRef(false); // memo: avoid react strict mode (for dev)
  const { game } = useContext(AppContext);

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();

  const editMode = useCallback(() => {
    game.room.edit();
    edit();
  }, [game]);
  const viewMode = useCallback(() => {
    game.room.view();
    view();
  }, [game]);
  const onDropObject = useCallback(() => {
    game.room.movingItemManager.drop();
  }, [game]);
  const onMoveObject = useCallback(() => {
    game.room.movingItemManager.move();
  }, [game]);
  const onRemoveObject = useCallback(() => {
    game.room.roomItemManager.removeItem(actionMenuState.id);
  }, [game, actionMenuState.id]);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    game.loadGame(onOpenActionMenu);

    // todo: load items from on-chain
    game.room.roomItemManager.loadItems([
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, xStart: 0, yStart: 0, xEnd: 1, yEnd: 1 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2, xStart: 3, yStart: 4, xEnd: 4, yEnd: 5 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 3, xStart: 10, yStart: 10, xEnd: 12, yEnd: 12 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 4, xStart: 12, yStart: 6, xEnd: 14, yEnd: 9 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 5, xStart: 4, yStart: 8, xEnd: 5, yEnd: 9 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 6, xStart: 4, yStart: 9, xEnd: 5, yEnd: 10 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 7, xStart: 1, yStart: 13, xEnd: 3, yEnd: 16 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 8, xStart: 2, yStart: 2, xEnd: 4, yEnd: 4 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 9, xStart: 7, yStart: 12, xEnd: 9, yEnd: 14 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 10, xStart: 15, yStart: 0, xEnd: 16, yEnd: 2 },
      { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 11, xStart: 15, yStart: 15, xEnd: 16, yEnd: 16 },
    ]);
  }, [game]);

  return (
    <>
      <Collection isOpen={isOpenCollection} onClose={onCloseCollection} />
      <Inventry isOpen={isOpenInventory} onClose={onCloseInventory} />

      <ActionMenu
        state={actionMenuState}
        onClose={onCloseActionMenu}
        onBack={onDropObject}
        onClickMove={onMoveObject}
        onClickLink={() => {}}
        onClickTrash={onRemoveObject}
      />

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
          onClick={onOpenCollection}
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
          onClick={onOpenInventry}
        >
          📦
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
    </>
  );
};

export default Index;
