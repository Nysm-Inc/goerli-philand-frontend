import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Box, Modal, ModalContent, useDisclosure, Center, Flex, HStack } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import GameUI from "~/ui/GameUI";

const Index: NextPage = () => {
  // memo: avoid react strict mode (for dev)
  const loadedRef = useRef(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalContent border="2px solid" borderColor="black" borderRadius="none">
          <Center h="480px">
            <></>
          </Center>
        </ModalContent>
      </Modal>

      <Flex
        position="fixed"
        w="full"
        h="80px"
        justify="space-between"
        align="center"
        pt="8px"
        pb="8px"
        pl="16px"
        pr="16px"
      >
        <HStack>
          <Image src="/logo.png" width="64px" height="64px" />
          <Box w="280px" h="40px" border="1px solid" borderColor="black" />
        </HStack>
        <Box>
          <Box w="144px" h="40px" border="1px solid" borderColor="black" />
        </Box>
      </Flex>
      <Flex
        position="fixed"
        bottom="0"
        w="full"
        h="80px"
        justify="space-between"
        align="center"
        pt="8px"
        pb="8px"
        pl="16px"
        pr="16px"
      >
        <Box>
          <Box w="144px" h="40px" border="1px solid" borderColor="black" />
        </Box>
        <HStack spacing="16px">
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
        <Flex w="calc(40px + 40px + 16px)" justify="space-between">
          <Center
            w="40px"
            h="40px"
            border="1px solid"
            borderColor="black"
            bgColor="white"
            cursor="pointer"
            onClick={() => {
              // todo
            }}
          >
            <Image src="/icons/pencil.svg" width="32px" height="32px" />
          </Center>
          <Box w="40px" h="40px" border="1px solid" borderColor="black" />
        </Flex>
      </Flex>

      <GameUI />
    </>
  );
};

export default Index;
