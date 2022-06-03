import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Center, Flex, HStack, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Quest from "~/ui/features/quest";
import Inventry from "~/ui/features/inventry";
import Collection from "~/ui/features/collection";
import { ActionMenu, useActionMenu, Button, Wallet, SelectBox } from "~/ui/components";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useBalances } from "~/hooks/object";
import { useClaim } from "~/hooks/claim";
import { IObject } from "~/game/types";
import { phiObjectMetadataList } from "~/types/object";
import { PhiObject } from "~/types";

const Index: NextPage = () => {
  // memo: avoid react strict mode (for dev)
  const loadGameRef = useRef(false);
  const enterRoomRef = useRef(false);
  const loadItemRef = useRef(false);

  const router = useRouter();
  const { game } = useContext(AppContext);
  const { data: account } = useAccount();
  const { data: ens } = useEnsName({ address: account?.address });
  // const { data: avatar } = useEnsAvatar({ addressOrName: account?.address });

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();

  const [domains, currentENS, switchCurrentENS] = useENS(account?.address, ens);
  const balances = useBalances(account?.address, isEdit);
  const [{ loading, isCreated }, createPhiland] = useCreatePhiland(currentENS);
  const phiObjects = useViewPhiland(ens, isEdit);
  const claimObject = useClaim(account?.address);
  const [depositObjects] = useDeposit(ens, isEdit);
  const save = useSave(ens);

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

  // todo: refactor
  const onSave = () => {
    const immutable = (prevObject: PhiObject, newObject: PhiObject) => {
      return (
        prevObject.xStart === newObject.xStart &&
        prevObject.yStart === newObject.yStart &&
        prevObject.contractAddress === newObject.contractAddress &&
        prevObject.tokenId === newObject.tokenId
      );
    };

    const roomItems = game.room.roomItemManager.getItems();
    const prevPhiObjects = phiObjects.reduce((memo, object, idx) => {
      if (object.tokenId) {
        return { ...memo, [idx]: object };
      } else {
        return memo;
      }
    }, {} as { [removeIdx: string]: PhiObject });
    const newPhiObjects: PhiObject[] = Object.values(roomItems).map((item) => {
      const [tileX, tileY] = item.getTile();
      const [sizeX, sizeY] = item.getSize();
      const object = item.getObject();
      return {
        contractAddress: object.contractAddress,
        tokenId: object.tokenId,
        xStart: tileX,
        yStart: tileY,
        xEnd: tileX + sizeX,
        yEnd: tileY + sizeY,
      };
    });

    const removeIdxs = Object.keys(prevPhiObjects).reduce((memo, removeIdx) => {
      if (newPhiObjects.some((newObject) => immutable(prevPhiObjects[removeIdx], newObject))) {
        return memo;
      } else {
        return [...memo, removeIdx];
      }
    }, [] as string[]);
    const writeArgs = newPhiObjects.reduce((memo, newObject) => {
      if (Object.values(prevPhiObjects).some((prevObject) => immutable(prevObject, newObject))) {
        return memo;
      } else {
        return [...memo, newObject];
      }
    }, [] as PhiObject[]);

    save(
      { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
      writeArgs,
      writeArgs.map(() => {
        return { title: "", url: "" };
      })
    );
  };

  useEffect(() => {
    if (loadGameRef.current) return;
    loadGameRef.current = true;

    game.loadGame(onOpenActionMenu);
  }, []);

  useEffect(() => {
    if (isCreated || phiObjects.length > 0) {
      if (enterRoomRef.current) return;
      enterRoomRef.current = true;

      game.room.enterRoom();
    }
  }, [isCreated]);

  useEffect(() => {
    if (!enterRoomRef.current) return;
    const _phiObjects = phiObjects.filter((object) => object.tokenId > 0);
    if (_phiObjects.length <= 0) return;
    if (loadItemRef.current) return;
    loadItemRef.current = true;

    game.room.roomItemManager.loadItems(_phiObjects);
  }, [phiObjects.length, enterRoomRef.current]);

  useEffect(() => {
    // todo: leaveRoom();
  }, [isCreated]);

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
          items={depositObjects.reduce((memo, object) => {
            if (object.amount - object.used > 0) {
              const metadata = phiObjectMetadataList[object.contractAddress][object.tokenId];
              return [
                ...memo,
                {
                  contractAddress: object.contractAddress,
                  tokenId: metadata.tokenId,
                  sizeX: metadata.size[0],
                  sizeY: metadata.size[1],
                },
              ];
            } else {
              return memo;
            }
          }, [] as IObject[])}
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
                <Image src={`/icons/${isEdit ? "arrow-back" : "pencil"}.svg`} width="32px" height="32px" />
              </Center>
              <Center
                w="40px"
                h="40px"
                border="1px solid"
                borderColor="black"
                bgColor="white"
                cursor="pointer"
                onClick={
                  isEdit
                    ? () => {
                        onSave();
                      }
                    : () => {
                        alert("share to twitter");
                      }
                }
              >
                <Image src={`/icons/${isEdit ? "disk" : "upload"}.svg`} width="32px" height="32px" />
              </Center>
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
