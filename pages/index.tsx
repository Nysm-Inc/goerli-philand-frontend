import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Center, Flex, HStack, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Quest from "~/ui/features/quest";
import Inventory from "~/ui/features/inventory";
import Collection from "~/ui/features/collection";
import { ActionMenu, useActionMenu, Button, Wallet, SelectBox } from "~/ui/components";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useBalances } from "~/hooks/object";
import { useClaim } from "~/hooks/claim";
import { phiObjectMetadataList } from "~/types/object";
import { PhiObject, IObject } from "~/types";

const Index: NextPage = () => {
  const loadGameRef = useRef(false);

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
  const [{ loading, isCreated }, createPhiland] = useCreatePhiland(currentENS);
  const phiObjects = useViewPhiland(currentENS, isEdit); // error
  const [depositObjects] = useDeposit(currentENS, isEdit); // error
  const save = useSave(currentENS);
  const claimObject = useClaim(account?.address);
  const balances = useBalances(account?.address, isEdit);

  const editMode = useCallback(() => {
    game.room.edit();
    edit();
  }, []);
  const viewMode = useCallback(() => {
    game.room.view();
    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
    view();
  }, [phiObjects.length]);
  const onDropObject = useCallback(() => {
    game.room.movingItemManager.drop();
  }, []);
  const onMoveObject = useCallback(() => {
    game.room.movingItemManager.move();
  }, []);
  const onRemoveObject = useCallback(() => {
    game.room.roomItemManager.removeItem(actionMenuState.id);
  }, [actionMenuState.id]);
  const onPickFromInventory = useCallback((object: IObject) => {
    game.room.movingItemManager.pickFromInventory(object);
  }, []);

  // todo: const diff = useMemo(() => {}, [])
  const onSave = () => {
    const prevPhiObjects = phiObjects;
    const newPhiObjects: PhiObject[] = Object.values(game.room.roomItemManager.getItems()).map((item) => {
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

    const removeIdxs = prevPhiObjects.reduce((memo, prevObject) => {
      if (newPhiObjects.some((newObject) => prevObject === newObject)) {
        return memo;
      } else {
        return [...memo, prevObject.removeIdx];
      }
    }, [] as (string | number)[]);
    const writeArgs = newPhiObjects.reduce((memo, newObject) => {
      if (prevPhiObjects.some((prevObject) => prevObject === newObject)) {
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

    (async () => {
      await game.loadGame(onOpenActionMenu);
      loadGameRef.current = true;
    })();
  }, []);

  useEffect(() => {
    if (!loadGameRef) return;

    if (isCreated) {
      game.room.enterRoom();
    } else {
      game.room.leaveRoom();
    }
  }, [isCreated]);

  useEffect(() => {
    if (!loadGameRef) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
  }, [phiObjects.length]);

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
        <Collection items={balances} isOpen={isOpenCollection} readonly={!isEdit} onClose={onCloseCollection} />
        <Inventory
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
          readonly={!isEdit}
          onClose={onCloseInventory}
          onClickItem={onPickFromInventory}
        />

        <HStack position="fixed" bottom="0" left="calc(50% - 120px / 2)" spacing="16px" h="64px" align="center">
          <Button icon={<Image src="/icons/sword.svg" width="32px" height="32px" />} onClick={onOpenQuest} />
          <Button icon={<Image src="/icons/collection.svg" width="32px" height="32px" />} onClick={onOpenCollection} />
          <Button icon={<>🧰</>} onClick={onOpenInventry} />
        </HStack>
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
