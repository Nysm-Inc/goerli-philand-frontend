import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Center, Flex, HStack, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Quest from "~/ui/features/quest";
import Inventry from "~/ui/features/inventry";
import Collection from "~/ui/features/collection";
import { ActionMenu, useActionMenu, Button, Wallet, SelectBox } from "~/ui/components";
import { useAccount, useENSName, useProvider } from "~/connectors/metamask";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useBalances } from "~/hooks/object";
import { useClaim } from "~/hooks/claim";
import { IObject } from "~/game/types";
import { phiObjectMetadataList } from "~/types/object";

const Index: NextPage = () => {
  // memo: avoid react strict mode (for dev)
  const loadedRef = useRef(false);

  const router = useRouter();
  const { game } = useContext(AppContext);
  const provider = useProvider();
  const account = useAccount();
  const ens = useENSName(provider);

  const [domains, currentENS, switchCurrentENS] = useENS(account, ens, provider);
  const [{ loading, isCreated }, createPhiland] = useCreatePhiland(currentENS, provider);
  const balances = useBalances(account, provider);
  const claimObject = useClaim(account, provider);
  const phiObjects = useViewPhiland(ens, provider);
  const [depositObjects] = useDeposit(ens, provider);
  const save = useSave(ens, provider);

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
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
  const onPickFromInventory = useCallback((object: IObject) => {
    game.room.movingItemManager.pickFromInventory(object);
    game.room.movingItemManager.move();
  }, []);

  const diff = useMemo(() => {
    //
  }, []);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    game.loadGame(onOpenActionMenu);
  }, []);

  useEffect(() => {
    if (isCreated || phiObjects.length > 0) {
      game.room.enterRoom();

      // todo
      game.room.roomItemManager.loadItems(phiObjects.filter((object) => object.tokenId));
    }
  }, [isCreated, phiObjects.length]);

  return (
    <>
      <>
        <HStack position="fixed" h="64px">
          <Box
            onClick={() => {
              game.room.leaveRoom();
              router.push("/explorer");
            }}
            cursor="pointer"
            pt="12px"
          >
            <Image src="/logo.png" width="64px" height="64px" />
          </Box>
          <Box w="280px" h="40px" border="1px solid" borderColor="black" />
        </HStack>
        <Flex position="fixed" right="0" mr="10px" h="64px" align="center">
          <Wallet />
        </Flex>
      </>

      <>
        <Quest isOpen={isOpenQuest} onClose={onCloseQuest} onClickItem={claimObject} />
        <Collection balances={balances} isOpen={isOpenCollection} onClose={onCloseCollection} />
        <Inventry
          readonly={!isEdit}
          items={depositObjects.map((object) => {
            const metadata = phiObjectMetadataList[object.contractAddress][object.tokenId];
            return {
              contractAddress: object.contractAddress,
              tokenId: metadata.tokenId,
              sizeX: metadata.size[0],
              sizeY: metadata.size[1],
            };
          })}
          isOpen={isOpenInventory}
          onClose={onCloseInventory}
          onClickItem={onPickFromInventory}
        />
      </>

      {isCreated ? (
        <>
          <ActionMenu
            state={actionMenuState}
            onClose={onCloseActionMenu}
            onBack={onDropObject}
            onClickMove={onMoveObject}
            onClickLink={() => {}}
            onClickTrash={onRemoveObject}
          />

          <>
            <Flex position="fixed" bottom="0" ml="10px" h="64px" align="center">
              <Box w="144px" h="40px">
                <SelectBox
                  options={domains.map((domain) => {
                    return { label: domain, value: domain };
                  })}
                  value={currentENS}
                  disabled={!account}
                  handleChange={switchCurrentENS}
                />
              </Box>
            </Flex>
            <HStack position="fixed" bottom="0" left="calc(50% - 120px / 2)" spacing="16px" h="64px" align="center">
              <Button icon={<Image src="/icons/sword.svg" width="32px" height="32px" />} onClick={onOpenQuest} />
              <Button
                icon={<Image src="/icons/collection.svg" width="32px" height="32px" />}
                onClick={onOpenCollection}
              />
              <Button icon={<>🧰</>} onClick={onOpenInventry} />
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
        </>
      ) : (
        <>
          {account && !loading ? (
            <Box position="fixed" top="calc(50% - 40px)" left="calc(50% - 280px / 2)">
              <VStack>
                <Box w="280px" h="40px">
                  <SelectBox
                    options={domains.map((domain) => {
                      return { label: domain, value: domain };
                    })}
                    value={currentENS}
                    disabled={!account}
                    handleChange={switchCurrentENS}
                  />
                </Box>
                <Center
                  w="280px"
                  h="40px"
                  border="1px solid"
                  borderColor="black"
                  cursor="pointer"
                  onClick={createPhiland}
                >
                  Create Philand
                </Center>
              </VStack>
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Index;
